import { useState } from "react";
import { SorguTipi } from "../SorguPanel";
import styled from "styled-components";
import "./SorguSolPanel.css";

const Tab = styled.button`
  font-size: 16px;
  flex: 1;
//   padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 1px solid orange;
//   outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const SorguSolPanel = () => {
    const [active, setActive] = useState(SorguTipi[0].name);

    return (<>
        <div className="sorgu-sol-tab-group">
          {SorguTipi.map(item => (
            <Tab
              key={item.name}
              active={active === item.name}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </Tab>
          ))}
        </div>
        <p />
        <p> Your payment selection: {active} </p>
      </>);
}

export default SorguSolPanel;