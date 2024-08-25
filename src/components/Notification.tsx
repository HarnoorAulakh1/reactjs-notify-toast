import "client-only";
import React from "react";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { useState, useEffect, createContext } from "react";
import { RxCross2 } from "react-icons/rx";

export const notificationContext = createContext<{
  data: { show: boolean; notification: string ,id:number};
  setter: React.Dispatch<
    React.SetStateAction<{ show: boolean; notification: string;id:number }>
  >;
}>({

  data: { show: false, notification: "" ,id: Date.now()},
  setter: () => {},
});

export function Notifications({ children }: { children: React.ReactNode }) {
  const [data, setter] = useState({ show: false, notification: "" ,id: Date.now()});
  useEffect(() => {
    console.log(data.id);
    if (!data.show) return;
    const id1 = setTimeout(() => setter((x) => ({ ...x, show: false })), 5100);
    return () => clearTimeout(id1);
    
  }, [data.show]);
  return (
    <notificationContext.Provider value={{ setter, data }}>
      {children}
      <AnimatePresence key={`${data.notification}-${Date.now()}`}>
        {data.show && (
          <motion.div
            key={data.id}
            initial={{ x: "100%" }}
            animate={{ x: "-5%" }}
            exit={{ x: "100%" }}
            transition={{ type: easeIn, duration: 0.3 }}
            className="z-[99999] bg-white w-[20rem] fixed top-[5%] text-black rounded-md right-0"
          >
            <RxCross2
              onClick={() => setter((x) => ({ ...x, show: false }))}
              className="absolute top-2 right-2"
            />
            <div className="px-2 pt-5 pb-2">{data.notification}</div>

            <div className="w-full overflow-hidden h-[5px] rounded-lg">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ type: easeIn, duration: 5 }}
                className="bg-red-700 w-full h-[5px]"
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </notificationContext.Provider>
  );
  
}
