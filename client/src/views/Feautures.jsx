import React, { useEffect, useState } from "react";
import saasApi from "../api/saas";

// styled components
import { Container } from "@chakra-ui/react";

const Feautures = () => {
  const [basic, setBasic] = useState("");
  const [premium, setPremium] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const basic = await saasApi.get("/feauture/basic");
        setBasic(basic.data.content);
      } catch (error) {
        setBasic("This content is not available for you!");
      }

      try {
        const premium = await saasApi.get("/feauture/premium");
        setPremium(premium.data.content);
      } catch (error) {
        setPremium("This content is not available for you!");
      }
    };

    fetchContent();
  }, []);

  return (
    <Container maxW="container.xl">
      <h4>Basic Content:</h4>
      <p>{basic}</p>
      <h4>Premium Content:</h4>
      <p>{premium}</p>
    </Container>
  );
};

export default Feautures;
