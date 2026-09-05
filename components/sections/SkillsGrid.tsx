// components/sections/SkillsGrid.tsx
import { 
  SiSolidity, 
  SiEthereum, 
} from 'react-icons/si';

// My core skills data
const SKILLS = [
  {
    name: "Solidity",
    icon: SiSolidity,
    color: "text-foreground/70",
  },
  {
    name: "EVM & Ethereum",
    icon: SiEthereum,
    color: "text-foreground/70",
  },
];

export const SkillsGrid = () => {
  return (
    <section className="mt-8">
      <h3 className="mb-6 text-3xl font-bold">🛠 Core Skills</h3>
      
      {/* Responsive grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="group flex flex-col items-center justify-center 
                       rounded-xl border border-border bg-background p-6 
                       shadow-md transition-all duration-300 
                       hover:scale-[1.02] hover:shadow-xl dark:bg-secondary/20"
          >
            {/* Icon with customization color */}
            <skill.icon size={36} className={`${skill.color} transition-transform group-hover:-translate-y-1`} />
            
            <p className="mt-3 text-center text-sm font-semibold">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};