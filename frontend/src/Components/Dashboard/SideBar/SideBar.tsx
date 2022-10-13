import { Button } from "antd";
import React from "react";

import { useAppDispatch } from "../../../store/hooks";
import { setSingOutActiveEmployee } from "../../../store/user/user.reducer";
import AccountInfo from "./AccountInfo";

const SideBar = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        height: "100%",
        padding: "30px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AccountInfo />
      <div>
        <Button
          onClick={() => {
            dispatch(setSingOutActiveEmployee());
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
