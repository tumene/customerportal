// import {
//   Button,
//   Checkbox,
//   Col,
//   PageHeader,
//   Row,
//   Skeleton,
//   Space,
//   Typography,
// } from "antd";
// import React, { useEffect, useState } from "react";
// import useModal from "../../../../hooks/useModal";
// import EducationCoverQuote from "./EducationCoverQuote";
// import useGetEducationBenefits from "../../../api/useGetEducationBenefits";
// import { groupArrayBy } from "../../../../utils/dataTypes";
// import { NumericFormat } from "react-number-format";

// export default function EducationCoverPremiumBenefits({
//   setSelectedBenefits,
//   setActiveCoverScreenId,
//   selectedBenefits,
//   coverDetails,
//   generateQuote,
//   generatingQuote,
// }) {
//   const [ConfirmationModal, openConfirmationModal] = useModal();
//   const getEducationBenefitsApi = useGetEducationBenefits();
//   const [benefits, setBenefits] = useState();

//   const getEducationBenefits = async () => {
//     try {
//       const response = await getEducationBenefitsApi.fetch();
//       setBenefits(response.data.result);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getEducationBenefits();
//   }, []);

//   const handleBenefitChange = ({ target: { value, checked } }) => {
//     const benefitsById = groupArrayBy(benefits || [], "id");
//     const newSelectedBenefits = [...selectedBenefits];
//     if (checked)
//       newSelectedBenefits = [...newSelectedBenefits, benefitsById[value][0]];
//     else
//       newSelectedBenefits = newSelectedBenefits.filter(
//         (benefit) => benefit.id != value
//       );

//     setSelectedBenefits(newSelectedBenefits);
//   };

//   return (
//     <>
//       <PageHeader
//         title="Get Education cover"
//         onBack={() => setActiveCoverScreenId("default-screen")}
//       />
//       <Space direction="vertical" size={30}>
//         <div className="base-banner">
//           <Space direction="vertical" align="center">
//             <Typography.Title>
//               <NumericFormat
//                 value={coverDetails?.selectedPackage?.benefit}
//                 displayType="text"
//                 thousandSeparator=","
//               />{" "}
//               KES
//             </Typography.Title>
//             <Typography.Paragraph>Premium</Typography.Paragraph>
//           </Space>
//         </div>

//         <div>
//           <h2>Our premium benefits</h2>
//           <p className="faint-text">Please select a benefit</p>
//         </div>

//         <Row gutter={[30, 30]}>
//           {!benefits
//             ? [...Array(6)].map((_, i) => (
//                 <Col key={i} span={8}>
//                   <Skeleton active />
//                 </Col>
//               ))
//             : null}
//           {benefits?.map((benefit) => (
//             <Col span={8}>
//               <Checkbox
//                 onChange={handleBenefitChange}
//                 checked={selectedBenefits.find((b) => b.id === benefit.id)}
//                 value={benefit?.id}
//                 key={benefit?.id}
//               >
//                 <Space direction="vertical" size={5}>
//                   <h3>{benefit?.name}</h3>
//                   <Typography.Paragraph>
//                     {benefit?.description}
//                   </Typography.Paragraph>
//                 </Space>
//               </Checkbox>
//             </Col>
//           ))}
//         </Row>

//         <br />

//         <Button type="primary" size="large" onClick={openConfirmationModal}>
//           Get total premium
//         </Button>
//       </Space>

//       <ConfirmationModal>
//         <EducationCoverQuote
//           {...{
//             onNext: (screen) => {
//               generateQuote?.(screen);
//             },
//             coverDetails,
//             selectedBenefits,
//             generatingQuote,
//           }}
//         />
//       </ConfirmationModal>
//     </>
//   );
// }
