import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import articles from "../data/documents.json";

import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

console.log("Running langchain file");

export interface Document {
  pageContent: string;
  metadata: {
    title: string;
    author: string;
    url: string;
  };
}

export interface Bite {
  pageContent: string;
  metadata: {
    parentTitle: string;
    parentAuthor: string;
    parentUrl: string;
    title: string;
    threadId: string;
  };
}

export const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
  modelKwargs: {
    response_format: { type: "json_object" },
  },
});

export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

export const supabaseClient = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export const documentStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

export const biteStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "bites",
  queryName: "match_bites",
});

// export const formattedArticles = articles.map(article => ({
//   pageContent: article.content,
//   metadata: {
//     title: article.title,
//     author: article.author,
//     url: article.url,
//   },
// }));

export const addDocumentsToStore = async (docs: Document[]) => { 
  if (!Array.isArray(docs)) {
    throw new Error("Expected docs to be an array");
  }

  // Validate each document
  docs.forEach(doc => {
    if (typeof doc.pageContent !== 'string') {
      throw new Error("Each document must have a 'pageContent' property of type string");
    }
  });

  await documentStore.addDocuments(docs);
};

export const generateBites = async (doc: Document): Promise<Bite[]> => {
  const threadId = uuidv4(); 
  const response = await llm.invoke([
    [
      "system",
      "You are a helpful assistant who extracts the most engaging insights from text in a concise way. Based on the input above, write the top 10 contrarian insights from the text in 500 characters or less per insight. Use an engaging and intriguing hook as the first sentence. Each insight should have a contradiction or other element that clarifies how it differs from conventional wisdom. Only present one point as poignant and information-dense as possible. Make sure the insights cover independent points and can be understood without any context beyond their own content. Return json with a title and a content property."
    ],
    [
      "human",
      `Here is the document: ${doc.pageContent} ### And here is the metadata: ${doc.metadata}`
    ],
  ]);

  const jsonResponse = JSON.parse(typeof response.content === 'string' ? response.content : JSON.stringify(response.content));

  console.log(jsonResponse);

  const formattedResponse = jsonResponse.insights.map((insight: { title: string; content: string }) => ({
    metadata: {
      parentTitle: doc.metadata.title,
      parentAuthor: doc.metadata.author,
      parentUrl: doc.metadata.url,
      title: insight.title,
      threadId: threadId, 
    },
    pageContent: insight.content,
  }));

  console.log(formattedResponse);

  return formattedResponse;
}

export const generateBitesFromWeb = async (webUrl: string): Promise<Bite[]> => {
  console.log("Generating bites from web");
  const htmlResponse = await fetch(webUrl);
  const htmlText = await htmlResponse.text();
  const cleanedHtml = htmlText
    .replace(/style="[^"]*"/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\s*on\w+="[^"]*"/gi, "")
    .replace(
      /<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ");

  console.log(cleanedHtml);

  // const threadId = uuidv4();
  const response = await llm.invoke([
    [
      "system",
      "You are a helpful assistant who extracts the most engaging insights from text in a concise way. Based on the input above, write the top 10 contrarian insights from the text in 500 characters or less per insight. Also provide a provoking and catchy title. Write from the author's point of view. Use clear language, short sentences and minmize academic or journalistic language. Use an engaging and intriguing hook as the first sentence. Each insight should have a contradiction or other element that clarifies how it differs from conventional wisdom. Only present one point as poignant and information-dense as possible. Make sure the insights cover independent points and can be understood without any context beyond their own content. Return a json array with one object per insight with the following schema: {metadata:{articleTitle:'',author:'',url:''},insightTitle:'',content:'first insight example'}"
    ],
    [
      "human",
      `Here is the document: ${cleanedHtml}`
    ],
  ]);

  const jsonResponse = JSON.parse(typeof response.content === 'string' ? response.content : JSON.stringify(response.content));
  console.log(jsonResponse);

  const threadId = uuidv4(); 

  const formattedResponse = jsonResponse.insights.map((bite: { metadata: { articleTitle: string; author: string; url: string }; insightTitle: string; content: string }) => ({
    metadata: {
      parentTitle: bite.metadata.articleTitle,
      parentAuthor: bite.metadata.author,
      parentUrl: webUrl,
      title: bite.insightTitle,
      threadId: threadId,
    },
    pageContent: bite.content,
  }));

  console.log(formattedResponse);

  return formattedResponse;
}

// generateBitesFromWeb("https://model-thinking.com/p/thames-into-tyburn");

export const addBitesToStore = async (docs: Bite[]) => { 
  try {
    console.log(docs);
    const formattedDocs = docs.map(doc => ({
      pageContent: doc.pageContent,
      metadata: doc.metadata
    }));
    console.log("Formatted docs:", JSON.stringify(formattedDocs, null, 2));
    const result = await biteStore.addDocuments(formattedDocs);
    console.log("Result of addDocuments:", result);
    return result;
  } catch (error) {
    console.error("Error in addBitesToStore:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};

// (async () => {
//   try {
//     const article = articles[2];
//     const formattedArticle: Document = {
//       pageContent: article.content || "",
//       metadata: {
//         title: article.metadata.title,
//         author: article.metadata.author,
//         url: article.metadata.url,
//       }
//     };
//     const newBites = await generateBites(formattedArticle);
//     console.log("NEW BITES", JSON.stringify(newBites, null, 2));
//     console.log("Embeddings configuration:", embeddings);
//     console.log("Supabase client:", supabaseClient);
//     await addBitesToStore(newBites);
//   } catch (error) {
//     console.error("Error in main execution:", error);
//   }
// })();

