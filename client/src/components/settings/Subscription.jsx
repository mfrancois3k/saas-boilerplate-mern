import React, { useState, useEffect } from "react";
import saasApi from "../../api/saas";
import { useSelector, useDispatch } from "react-redux";
import { getSubscription } from "../../feautures/subscription/subscriptionSlice";

// custom components
import Alert from "../Alert";

// styled components
import {
  Flex,
  Box,
  Heading,
  Button,
  Tag,
  Divider,
  Text,
} from "@chakra-ui/react";

const Subscription = () => {
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscription);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(getSubscription());
  }, [dispatch]);

  const createCustomerPortalSession = async () => {
    try {
      const { data } = await saasApi.post(
        "/stripe/create-customer-portal-session"
      );
      if (data) {
        window.location.href = data;
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  /* const handleFreeTrial = () => {
        createFreeTrial(data => {
            console.log(data, "FREE TRIAL CREATED")
        })
    } */

  return (
    <Box mb={8}>
      <Flex justify="space-between" align="center">
        <Heading as="h2" size="md" mb={2}>
          Subscription
        </Heading>
      </Flex>
      <Divider mb={4} />
      <Flex justify="space-between">
        <Box>
          <Heading
            as="h2"
            size="md"
            mb={2}
            fontWeight="bold"
            style={{ textTransform: "uppercase" }}
          >
            {subscription.plan}
          </Heading>
          <Text fontSize="xl">
            {(Math.round(subscription.amount) / 100).toFixed(2)}{" "}
            <span style={{ textTransform: "uppercase" }}>
              {subscription.currency}
            </span>{" "}
            per{" "}
            <span style={{ textTransform: "capitalize" }}>
              {subscription.interval}
            </span>
          </Text>
          <Text fontSize="lg">
            Your subscription will be auto renewed on{" "}
            {new Date(
              subscription.current_period_end * 1000
            ).toLocaleDateString("en-US")}{" "}
            with{" "}
            {subscription.default_payment_method
              ? `${subscription.default_payment_method.card.brand} **** ${subscription.default_payment_method.card.last4}`
              : ""}
          </Text>

          {subscription.cancel_at_period_end ? (
            <Text>
              This subscription will be canceled on{" "}
              {new Date(subscription.cancel_at * 1000).toLocaleDateString(
                "en-US"
              )}
            </Text>
          ) : (
            ""
          )}
        </Box>
        <Button mt={2} colorScheme="teal" onClick={createCustomerPortalSession}>
          Manage Subscription
        </Button>
      </Flex>

      {/* 
             
            UNLOCK 7 DAYS FREE TRIAL

            <Button
                mt={2}
                colorScheme="teal"
                onClick={handleFreeTrial}
                mr={4}
            >
                Activate Free Trial
            </Button> 
            
      */}

      <Text>Status: {subscription.status}</Text>
      {errorMessage && <Alert status="error" text={errorMessage} />}
    </Box>
  );
};

export default Subscription;
