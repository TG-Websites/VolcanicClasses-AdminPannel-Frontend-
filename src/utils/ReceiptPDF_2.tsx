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
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#333",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    logoSection: {
        flexDirection: "column",
    },
    logoText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#c00",
    },
    subtitle: {
        fontSize: 10,
        color: "#666",
    },
    dateSection: {
        textAlign: "right",
        fontSize: 10,
    },
    title: {
        fontSize: 14,
        textAlign: "center",
        marginVertical: 15,
        color: "#c00",
        fontWeight: "bold",
        textDecoration: "underline",
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 11,
        marginBottom: 6,
        fontWeight: "bold",
        color: "#000",
        textDecoration: "underline",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
    },
    footerBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        backgroundColor: "#13294b",
        color: "#fff",
        padding: 10,
        borderRadius: 4,
    },
    footerText: {
        fontSize: 12,
        fontWeight: "bold",
    },
    receiptFooter: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 9,
        color: "#555",
    },
    watermark: {
        position: "absolute",
        top: "40%",
        left: "20%",
        fontSize: 40,
        color: "rgba(200,0,0,0.1)",
        transform: "rotate(-20deg)",
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
          <Text style={styles.logoText}>VOLCANIC CLASSES</Text>
          <Text style={styles.subtitle}>Official Education Receipt</Text>
        </View>
        <Text>{data.date}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>EDUCATIONAL FEE RECEIPT</Text>

      {/* Transaction Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRANSACTION DETAILS</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Receipt Number:</Text>
          <Text>{data.receiptNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text>{data.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text>{data.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text>{data.totalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Remaining Amount:</Text>
          <Text>{data.remainingAmount}</Text>
        </View>
      </View>

      {/* Student Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STUDENT INFORMATION</Text>
        <View style={styles.row}>
          <Text  style={styles.label}>Full Name:</Text>
          <Text>{data.studentName}</Text>
        </View>
        <View style={styles.row}>
          <Text  style={styles.label}>Contact:</Text>
          <Text>{data.mobileNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text  style={styles.label}>Email:</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Text  style={styles.label}>Class/Grade:</Text>
          <Text>{data.className}</Text>
        </View>
      </View>

      {/* Course Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COURSE DETAILS</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Course:</Text>
          <Text>{data.courseName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mode:</Text>
          <Text>{data.mode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration:</Text>
          <Text>{data.duration}</Text>
        </View>
      </View>

      {/* Amount Paid */}
      <View style={styles.footerBox}>
                          <Text style={styles.footerText}>AMOUNT PAID</Text>
                          <Text style={styles.footerText}>{data.paidAmount}</Text>
      </View>

      {/* Watermark */}
      <Text style={styles.watermark}>VOLCANIC CLASSES</Text>

      {/* Footer */}
      <Text style={styles.receiptFooter}>
        OFFICIAL RECEIPT - VOLCANIC CLASSES {"\n"}
        This is a computer generated receipt and does not require physical
        signature {"\n"}
        Contact: info@volcanicclasses.org | Website: www.volcanicclasses.org
      </Text>
    </Page>
  </Document>
);

export default ReceiptPDF_2;
