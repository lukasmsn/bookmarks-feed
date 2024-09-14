import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import articles from "../data/documents.json";

import { createClient } from "@supabase/supabase-js";

console.log("Running langchain");

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

export const formattedArticles = articles.map(article => ({
  content: article.content,
  metadata: {
    title: article.title,
    author: article.author,
    url: article.url,
  },
}));

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
    },
    pageContent: insight.content,
  }));

  console.log(formattedResponse);

  return formattedResponse;
}

export const addBitesToStore = async (docs: Bite[]) => { 
  try {
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
//     const newBites = await generateBites(formattedArticles[1]);
//     console.log("NEW BITES", JSON.stringify(newBites, null, 2));
//     console.log("Embeddings configuration:", embeddings);
//     console.log("Supabase client:", supabaseClient);
//     await addBitesToStore(newBites);
//   } catch (error) {
//     console.error("Error in main execution:", error);
//   }
// })();