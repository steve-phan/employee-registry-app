import { Col, Divider, Row, Tag, Typography } from "antd";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { EmployeeAvatar } from "../../Account/EmployeeAvatar/EmployeeAvatar";
import { EmployeeColor } from "../../Employees/Employees.helpers";

export const EmployeeDetailsHeader = () => {
  const { firstName, lastName, role, address } = useAppSelector(
    (state) => state.dashboard.employeeDetails.employeeInfo
  );
  return (
    <Row>
      <Col flex="60px">
        <EmployeeAvatar />
      </Col>
      <Col
        flex="auto"
        style={{
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {firstName + " " + lastName}
        </p>
        <p
          style={{
            margin: 0,
          }}
        >
          {role.map((tag) => {
            return (
              <Tag
                color={EmployeeColor[tag]}
                key={tag}
                style={{
                  fontSize: "8px",
                }}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
          <span> {address.split(" ").slice(-1)[0]}</span>
        </p>
      </Col>
      <Divider />
    </Row>
  );
};
