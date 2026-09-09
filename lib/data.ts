// lib/data.ts
import { DetailedProject } from "./types";
export type { DetailedProject } from "./types";

// Detailed project data
export const PROJECTS_DATA: DetailedProject[] = [
  {
    slug: "ethicforge",
    title: "EthicForge — Modular Smart Contract Factory",
    shortDescription:
      "A modular smart contract system for ethical financial applications, built around reusable and composable on-chain modules.",
    thumbnail: "/images/projects/ethicforge.png",
    tags: [
      "Solidity",
      "Foundry",
      "OpenZeppelin",
      "Smart Contract",
      "Protocol Design",
      "Modular Architecture",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/saftanasdalihin/ethicforge",
    fullDescription:
      "EthicForge is a modular smart contract architecture designed as a collection of reusable building blocks for financial applications. The system uses a factory pattern to deploy independent modules that can be composed for different use cases, including profit-sharing partnerships, asset financing, and secure asset custody.",
    role:
      "Smart Contract Developer: Designed and implemented the core contract architecture, modular components, custom errors, access control, and testing strategy using Solidity and Foundry.",
    challenge:
      "The main challenge was designing reusable contracts without coupling the modules too tightly, while keeping permissions explicit and the architecture easy to extend.",
    solution:
      "Implemented a factory-based architecture with independently deployable modules such as PartnershipPool, AssetFinancing, and SecureVault. The system uses custom errors, transparent events, and reusable components to keep the protocol modular and maintainable.",
    keyFeatures: [
      "Factory-Based Contract Deployment",
      "Composable Smart Contract Modules",
      "Explicit Access Control",
      "Custom Errors & Events",
      "Gas-Conscious Contract Design",
      "Comprehensive Foundry Testing",
      "Upgradeable-Ready Architecture",
    ],
    galleryImages: ["/images/projects/ethicforge.png"],
  },

  {
    slug: "sura-chain",
    title: "SuraChain — On-Chain Voting Protocol",
    shortDescription:
      "A censorship-resistant on-chain voting protocol focused on transparent vote execution, single-vote enforcement, and secure contract logic.",
    thumbnail: "/images/projects/surachain.png",
    tags: [
      "Solidity",
      "Foundry",
      "OpenZeppelin",
      "EVM",
      "Governance",
      "Smart Contract Security",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/saftanasdalihin/sura-chain",
    fullDescription:
      "SuraChain is an on-chain voting protocol where voting activity is recorded and verified directly on the blockchain. The contract enforces one-address-one-vote and time-bound elections while exposing results through transparent on-chain state.",
    role:
      "Smart Contract Developer: Designed and implemented the voting logic, participation restrictions, election timing, events, and Foundry test suite.",
    challenge:
      "The main challenge was enforcing single-vote participation and election deadlines while keeping the contract logic simple, transparent, and gas-conscious.",
    solution:
      "Implemented address-based vote tracking, deadline enforcement, custom errors, events, and comprehensive unit and edge-case testing with Foundry.",
    keyFeatures: [
      "One Address = One Vote",
      "Double-Voting Prevention",
      "Time-Bound Elections",
      "On-Chain Vote Tallying",
      "Custom Errors & Events",
      "Foundry Testing",
    ],
    galleryImages: ["/images/projects/voting.png"],
  },

  {
    slug: "classfund",
    title: "ClassFund — Group Treasury Smart Contract",
    shortDescription:
      "A blockchain-based treasury management system for transparent group contributions and role-restricted withdrawals.",
    thumbnail: "/images/projects/classfund.png",
    tags: [
      "Solidity",
      "Smart Contract",
      "EVM",
      "Treasury",
      "Access Control",
      "Hardhat",
    ],
    liveUrl:
      "https://sepolia.etherscan.io/address/0x43c9c8ced4655a2b7ee26d680935cb0d82bdf071#code",
    githubUrl: "https://github.com/saftanasdalihin/classfund",
    fullDescription:
      "ClassFund is a full-stack blockchain application for managing shared class funds transparently on-chain. The smart contract tracks contributions and restricts treasury operations according to defined roles.",
    role:
      "Smart Contract Developer: Designed the treasury logic, contribution tracking, role-based permissions, withdrawal mechanism, and contract integration with the frontend.",
    challenge:
      "The main challenge was maintaining transparent fund accounting while ensuring sensitive treasury operations could only be executed by authorized participants.",
    solution:
      "Implemented on-chain contribution tracking, role-based permissions between Treasurer and Members, and restricted treasury operations through Solidity access control.",
    keyFeatures: [
      "On-Chain Contribution Tracking",
      "Role-Based Treasury Permissions",
      "Restricted Withdrawals",
      "Transparent Transaction History",
      "Full-Stack DApp Integration",
    ],
    galleryImages: ["/images/projects/classfund.png"],
  },

  {
    slug: "erc20-access-control",
    title: "ERC-20 Token — Access Control & Pausable",
    shortDescription:
      "A minimal ERC-20 token implementation demonstrating OpenZeppelin integration, ownership, emergency pausing, and Foundry testing.",
    thumbnail: "/images/projects/erc20.png",
    tags: [
      "Solidity",
      "Foundry",
      "OpenZeppelin",
      "ERC-20",
      "Access Control",
      "Pausable",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/saftanasdalihin/erc-20",
    fullDescription:
      "This project explores the integration of OpenZeppelin's ERC20, Ownable, and Pausable components into a minimal token contract. Rather than reimplementing standard primitives, the project focuses on composing established components and verifying their intended behavior through Foundry tests.",
    role:
      "Smart Contract Developer: Integrated OpenZeppelin modules, implemented the token-specific contract logic, and built the Foundry test suite.",
    challenge:
      "The main challenge was understanding how standard OpenZeppelin primitives interact and ensuring administrative permissions and emergency controls behave as intended.",
    solution:
      "Combined ERC20 token functionality with Ownable and Pausable, then verified ownership, token transfers, access restrictions, and pause behavior through automated tests.",
    keyFeatures: [
      "ERC-20 Token Standard",
      "Owner-Based Access Control",
      "Emergency Pause Mechanism",
      "OpenZeppelin Integration",
      "Foundry Testing",
    ],
    galleryImages: ["/images/projects/erc20.png"],
  },
];

// Helper function to fetch data by slug
export function getProjectBySlug(slug: string): DetailedProject | undefined {
  return PROJECTS_DATA.find(p => p.slug === slug);
}

// Helper function to fetch all slugs (for Static Generation)
export function getAllProjectSlugs() {
    return PROJECTS_DATA.map(p => ({ slug: p.slug }));
}