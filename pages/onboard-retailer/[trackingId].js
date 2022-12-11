import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Home from "../../components/modules/onbordRetailer/Home";
import PrivateLayout from "../../components/ui/organisms/layout/PrivateLayout";
import { BASE_API_URL } from "../../constants/api";
import { useGlobalContext } from "../../context/global/provider";
import { getFromStorage, saveToLocalStorage } from "../../utils/dataTypes";

export default function index() {
  const router = useRouter();
  const { trackingId } = router?.query;
  const [trackingIdIsVaild, setTrackingIdIsVaild] = useState(true);
  const {
    state,
    state1: { data },
    dispatch,
    addData,
  } = useGlobalContext();

  useEffect(() => {
    if (trackingId) {
      // ;
      let userSessionStage = `userCurrentStage__${trackingId}`;
      let userSessionId = `userQuoteDetails_Storage__${trackingId}`;
      let quoteDetails = getFromStorage(userSessionId);
      if (quoteDetails !== null) {
        addData(quoteDetails);
        setTrackingIdIsVaild(false);
        saveToLocalStorage("currentTrackingId_equity", trackingId);
      } else {
        axios
          .get(`${BASE_API_URL}Quote/quotedetails/${trackingId}`)
          .then(function (response) {
            let statusCode = response?.data?.statusCode;
            if (statusCode != "00") {
              router.push("/error");
            }
            let responseOData = response?.data?.responseObject;
            addData(responseOData);
            setTrackingIdIsVaild(false);
            saveToLocalStorage(userSessionId, responseOData);
            saveToLocalStorage(userSessionStage, "registration");
            saveToLocalStorage("currentTrackingId_equity", trackingId);
          })
          .catch(function (error) {
            router.push("/error");
          });
      }
    }
  }, [trackingId]);

  if (trackingIdIsVaild) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Home />
    </>
  );
}
