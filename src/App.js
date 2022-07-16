import React from "react";
import { Layout } from "antd";
import HomePage from './components/HomePage'
import "./components/FontawsomeIcons";

const { Header, Content } = Layout;

function App() {
  return ( 
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
        Who Touched What?
        </div>
    </Header>
    <Content
      style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
    >
      <HomePage/>
    </Content>
  </Layout>
  );
}

export default App;
