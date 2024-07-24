import { StackClient } from "@stackso/js-core";

// Initialize the airdropStack client
const airdropStack = new StackClient({
  apiKey: process.env.STACK_API_KEY || "",
  pointSystemId: 2572,
});

// Initialize the bountyStack client
const bountyStack = new StackClient({
  apiKey: process.env.STACK_API_KEY || "",
  pointSystemId: 2962,
});

export { airdropStack, bountyStack };
