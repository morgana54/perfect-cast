import { motion } from "framer-motion";
import { roles } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export const RoleList = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
        Casting Offers
      </h1>
      <div className="space-y-4">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate(`./role/${role.id}`)}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {role.title}
            </h2>
            <p className="text-muted-foreground">{role.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
