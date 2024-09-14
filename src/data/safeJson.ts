const originalString = `The qualifying round is over—in the new era construction is king.

Published August 5, 2024

The race to model parity has been the defining project of the last 12 months in AI. This phase was characterized by the search for new research techniques, better training data and larger cluster sizes.

The next phase in the AI race is going to look different: It will be defined more by physical construction than by scientific discovery.

Up until now, you could fit your training cluster into an existing data center via colocation or retrofit. If you needed to increase cluster size from 15k GPUs to 25k GPUs, you found a way to plug-in more GPUs. This is changing: The “[Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html?ref=blog.heim.xyz)”—which most market participants in AI have internalized—says that model size is the number one driver of performance. As a result, the next generation of models are aiming for a 10x increase in model scale to 300k GPUs. To house one of these models, you need to build an entire new data center.

This changes AI in two fundamental ways: First, it changes the lead time between models. If before you could train your model in 6 to 12 months, now you need to add 18 to 24 months of construction time before you can actually start training. Second, it changes the source of maximum competitive advantage. In the new era, construction efficiency may matter more than research breakthroughs.

This sea change in how AI works was a major theme of big tech earnings last week. Annualized CapEx for big tech increased from $138B to $229B year-over-year. This incremental $91B in run-rate spending is a good proxy for new AI data center construction—an enormous investment.

Today’s CapEx will likely yield fruit somewhere between late 2025 and early 2026, at which point we’ll find out if these larger models are intelligent enough to unlock new revenue streams and generate a return on investment.

!https://www.sequoiacap.com/wp-content/uploads/sites/6/2024/08/next-phase-ai-capex_1.png

Source: Earnings transcripts, public filings. “Incremental CapEx” is a proxy for run-rate spend on new AI data centers.

So what exactly is going to happen over the next 1 to 2 years, and how does one “win” in this new phase of AI?

Building data centers is a messy and complex business. We think day-to-day operational execution is going to have the biggest impact on who is most successful. Here’s how it works behind the scenes:1

- A real estate developer—QTS, Vantage and CyrusOne are three popular ones—goes and buys land and power that they believe a data center can be built on.
- The developer approaches the big tech companies and offers them a 15-year or 20-year lease on the data center, for a total cost of $2-10B.
- Once the developer has a signed deal, they go to the capital markets, and they raise debt against the deal, usually from banks or real estate investors.
- The debt investors are not underwriting the future AI demand in the data center—they are underwriting the credit of the customer, say Microsoft or Amazon, and expect a yield that is a slight premium to corporate debt.
- The developer goes and hires a general contractor—for example, [DPR](https://www.dpr.com/), one of the most popular data center builders.
- The general contractor goes and hires subcontractors. The subcontractors then go and recruit labor. Labor is a huge component of the cost of data center construction.
- Labor moves to the location where the data center is getting built—for example, a small town or city—and they are put up in hotels or other accommodations in the area.
- Over a two year period, a massive construction project takes place, starting with steel and concrete for the overall structure, and ending with industrial parts and GPUs being installed.
- During this whole process, the end-user of the data center (e.g., Microsoft or Amazon) is negotiating with their own supply chain for diesel generators, liquid cooling systems, and other necessary equipment.

Today, five companies have arrived at the starting line in this new race toward data center scale-up: Microsoft/OpenAI, Amazon/Anthropic, Google, Meta and xAI. Each has a model that has held up against serious benchmarks, and the necessary capital to proceed.

With the market structure now crystallized, we can begin to see how each player will take a unique approach—derived from their own business fundamentals—in order to win:

- **Meta and xAI** are consumer companies, and they will both vertically integrate, hoping to benefit from each having a single founder decision maker who can streamline and tightly couple model building efforts with data center design and construction. Both companies will seek to launch killer consumer applications on the back of more intelligent models.
- **Microsoft and Amazon** have grizzled data center teams and deep pockets, and they’ve leveraged these assets to forge partnerships with the top tier research labs. They hope to monetize through 1) Selling training to other companies, and 2) Selling model inference. They will need to manage resource allocation between their frontier models (GPT 5 and Claude 4) and other data centers being built for Enterprise customer use.
- **Google** has both a consumer business and a cloud business, and also has its own in-house research team. On Friday, the company announced it was bringing [Noam Shazeer](https://techcrunch.com/2024/08/02/character-ai-ceo-noam-shazeer-returns-to-google/) back into the fold. Google also has vertically integrated all the way down to the chip layer with TPUs. These factors should provide long-term structural advantages.

With CapEx plans now firmly in place and the competitive landscape set, the new AI era begins. In this new phase of AI, steel, servers and power will replace models, compute and data as the “must-wins” for anyone hoping to pull ahead.

1. In this example, we assume a lease structure. In the case of an internal build, the hyperscaler acts both as the customer and as the real estate developer.`

const safeString = JSON.stringify(originalString);
console.log(safeString);