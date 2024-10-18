import "client-only";
import React from "react";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { useState, useEffect, createContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";

type Notification = {
  show: boolean;
  notification: string;
  id: number;
  type: "success" | "error" | "pending";
};

export const notificationContext = createContext<{
  data: Notification[];
  setter: React.Dispatch<React.SetStateAction<Notification[]>>;
}>({
  data: [],
  setter: () => {},
});

export function Notifications({ children }: { children: React.ReactNode }) {
  const [data, setter] = useState<Notification[]>([]);
  return (
    <notificationContext.Provider value={{ setter, data }}>
      {children}

      <div className="z-[99999] flex flex-col gap-[2rem] w-max fixed top-[5%] text-black rounded-md right-0">
        {data.map((x, i) => (
          <Card
            key={x.id}
            show={x.show}
            notification={x.notification}
            id={x.id}
            type={x.type}
          />
        ))}
      </div>
    </notificationContext.Provider>
  );
}

function Card({ show, notification, id, type }: Notification) {
  const [data, setter] = useState({ show, notification });
  const [loaderColor, setLoaderColor] = useState("blue");

  
  useEffect(() => {
    if(type === "success") {
      setLoaderColor("bg-[#4cb543]");
    }
    if(type === "pending") {
      setLoaderColor("bg-[#FFBE12]");
    }
  
    if(type === "error") {
      setLoaderColor("bg-red-700");
    }
    const id1 = setTimeout(() => setter((x) => ({ ...x, show: false })), 5100);
    return () => {
      clearTimeout(id1);
    };
  }, [data.show]);
  return (
    <>
      <AnimatePresence>
        {data.show && (
          <motion.div
          key={id}
            initial={{ x: "100%" }}
            animate={{ x: "-5%" }}
            exit={{ x: "100%" }}
            transition={{ type: easeIn, duration: 0.3 }}
            className="z-[99999] bg-white w-[20rem]  text-black rounded-md"
          >
            <RxCross2
              onClick={() => setter((x) => ({ ...x, show: false }))}
              className="absolute top-2 right-2"
            />
            <div className="px-2 pt-5 pb-2">{data.notification}</div>
            <div className="w-full overflow-hidden h-[5px] rounded-lg">
              <motion.div
                key={id}
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ type: easeIn, duration: 5 }}
                className={`${loaderColor} w-full h-[5px]`}
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
