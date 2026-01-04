# Semi-Autonomous Web Interaction Agent

# Problem Statement

This project aims to create a semi-automatic web interaction agent which has the capability to observe a web page, analyze it, and act on it in a meaningful way, based on an objective, rather than strictly following a script.
For this scenario, the agent’s job is to determine the cost of the most expensive book listed on the BooksToScrape website and extract this information from the page.

# Approach
The system exhibits the Observe-Decide-Act cycle, a popular design pattern of Autonomous Agents systems.
Rather than implementing an automated testing system, the emphasis is on:
Reasoning about page layout
Dynamic decision-making

The agent:
1. Accesses a target web site
2. Notes relevant details (book titles and prices)
3. Decision logic is applied to determine the highest-priced item
4. It returns structured results to the orchestration layer

# Architecture Overview
Architecture Overview n8n is utilized as the orchestration layer, as Playwright is used for browser interaction. High-level Flow: Manual Trigger → Input Configure → Browser Agent Execution → Structured JSON Output The browser agent runs with Node.js and Playwright and returns responses to the n8n platform via JSON output.

## Decision Logic
The Agent:
Pulls out all visible book entries from the page
Extracts prices into numerical forms
Compares all the prices, identifies the maximum price, and provides that price
It fetches the title, price, and metadata of the costliest book.
Decision-making happens dynamically during execution and does not involve the use of hard-coded values or selectors.

## Key Characteristics

Semi-Autonomous (goal-driven, but not scripted
more logic-reasoning oriented than ui-testing
Reproducible via exported n8n workflow
Optimized for interpretability and understandability

## Limitations
- Currently supports only one page of result set
No persistent state between runs

Rule-based reasoning (without LLM integration)

## Future Enhancements
Multi-page crawling
