import React from "react";
import Tabs from "react-bootstrap/Tabs";

//BOOTSTRAP COMPONENTS

const Tab = (props) => {
   const { tabsList, keyParam } = props;
   const [key, setKey] = keyParam;

   return (
      <div className="custom-tab">
         <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}>
            {tabsList.map((item, idx) => (
               <Tab
                  eventKey={item?.eventKey}
                  title={item?.title}
                  key={item?.eventKey}>
                  {item?.content}
               </Tab>
            ))}
         </Tabs>
      </div>
   );
};

export default Tab;
