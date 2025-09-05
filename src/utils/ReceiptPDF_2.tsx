import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed
Font.register({
  family: "Helvetica",
  fonts: [{ src: "https://fonts.gstatic.com/s/helvetica.ttf" }],
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "red",
    marginVertical: 10,
    textAlign: "center",
    textDecoration: "underline",
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 9,
    color: "gray",
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "15%",
    fontSize: 50,
    color: "rgba(255,0,0,0.2)",
    transform: "rotate(-30deg)",
  },
  amountBox: {
    backgroundColor: "#1a2942",
    color: "white",
    padding: 10,
    borderRadius: 6,
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});

interface ReceiptPDFProps {
  data: {
    receiptNumber: string;
    date: string;
    time: string;
    totalAmount: number;
    remainingAmount: number;
    studentName: string;
    mobileNumber: string;
    email: string;
    className: string;
    courseName: string;
    mode: string;
    duration: string;
    paidAmount: number;
  };
}

const ReceiptPDF_2: React.FC<ReceiptPDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>VOLCANIC CLASSES</Text>
          <Text style={styles.subtitle}>Official Education Receipt</Text>
        </View>
        <Text>{data.date}</Text>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>EDUCATIONAL FEE RECEIPT</Text>

      {/* Transaction Details */}
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fieldLabel}>TRANSACTION DETAILS</Text>
        <View style={styles.row}>
          <Text>Receipt Number:</Text>
          <Text>{data.receiptNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text>Date:</Text>
          <Text>{data.date}</Text>
        </View>
        <View style={styles.row}>
          <Text>Time:</Text>
          <Text>{data.time}</Text>
        </View>
        <View style={styles.row}>
          <Text>Total Amount:</Text>
          <Text>{data.totalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text>Remaining Amount:</Text>
          <Text>{data.remainingAmount}</Text>
        </View>
      </View>

      {/* Student Information */}
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fieldLabel}>STUDENT INFORMATION</Text>
        <View style={styles.row}>
          <Text>Full Name:</Text>
          <Text>{data.studentName}</Text>
        </View>
        <View style={styles.row}>
          <Text>Contact:</Text>
          <Text>{data.mobileNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text>Email:</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Text>Class/Grade:</Text>
          <Text>{data.className}</Text>
        </View>
      </View>

      {/* Course Details */}
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fieldLabel}>COURSE DETAILS</Text>
        <View style={styles.row}>
          <Text>Course:</Text>
          <Text>{data.courseName}</Text>
        </View>
        <View style={styles.row}>
          <Text>Mode:</Text>
          <Text>{data.mode}</Text>
        </View>
        <View style={styles.row}>
          <Text>Duration:</Text>
          <Text>{data.duration}</Text>
        </View>
      </View>

      {/* Amount Paid */}
      <Text style={styles.amountBox}>AMOUNT PAID: {data.paidAmount}</Text>

      {/* Watermark */}
      <Text style={styles.watermark}>VOLCANIC CLASSES</Text>

      {/* Footer */}
      <Text style={styles.footer}>
        OFFICIAL RECEIPT - VOLCANIC CLASSES {"\n"}
        This is a computer generated receipt and does not require physical
        signature {"\n"}
        Contact: info@volcanicclasses.org | Website: www.volcanicclasses.org
      </Text>
    </Page>
  </Document>
);

export default ReceiptPDF_2;
