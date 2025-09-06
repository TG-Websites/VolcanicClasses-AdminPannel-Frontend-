// src/components/ReceiptPDF.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet,Image } from "@react-pdf/renderer";
import logo from '../Assets/logo.png'
import { generateReceiptNumber } from "./generateReceiptNumber";

// Define styles
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
    logo: {
    width: 120,  
    height: "auto", 
    marginBottom: 4,
  },
});

interface ReceiptPDFProps {
    order: any;
    paidAmount: string;
}



const ReceiptPDF: React.FC<ReceiptPDFProps> = ({ order, paidAmount }) => {
    const now = new Date();
    //   const remaining = order.dueAmount - Number(paidAmount);
    const receiptNumber = generateReceiptNumber();
    // helper function
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" }); // Sept
        const year = date.getFullYear();

        // add ordinal suffix
        const getOrdinal = (n: number) => {
            if (n > 3 && n < 21) return "th"; // 4-20 -> th
            switch (n % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${getOrdinal(day)} ${month} ${year}`;
    };


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        <Image src={logo} style={styles.logo} />
                        <Text style={styles.subtitle}>Official Education Receipt</Text>
                    </View>

                    <View style={styles.dateSection}>
                        <View style={styles.dateSection}>
                            <Text>{formatDate(now)}</Text>
                        </View>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>EDUCATIONAL FEE RECEIPT</Text>

                {/* Transaction Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>TRANSACTION DETAILS</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Receipt Number:</Text>
                        <Text>{receiptNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Amount:</Text>
                        <Text>{order.amount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Remaining Amount:</Text>
                        <Text>{order.dueAmount}</Text>
                    </View>
                </View>

                {/* Student Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>STUDENT INFORMATION</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text>{order.user.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact:</Text>
                        <Text>{order.user.mobileNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text>{order.user.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Class/Grade:</Text>
                        <Text>{order.className}</Text>
                    </View>
                </View>

                {/* Course Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>COURSE DETAILS</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Course:</Text>
                        <Text>{order.course.title}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mode:</Text>
                        <Text>{order.paymentMode}</Text>
                    </View>
                </View>

                {/* Total Paid */}
                <View style={styles.footerBox}>
                    <Text style={styles.footerText}>AMOUNT PAID</Text>
                    <Text style={styles.footerText}>{paidAmount}</Text>
                </View>

                {/* Footer */}
                <Text style={styles.receiptFooter}>
                    OFFICIAL RECEIPT - VOLCANIC CLASSES{"\n"}
                    This is a computer generated receipt and does not require physical signature{"\n"}
                    Contact: info@volcanicclasses.org | Website: www.volcanicclasses.org
                </Text>

                {/* Watermark */}
                <Text style={styles.watermark}>VOLCANIC CLASSES</Text>
            </Page>
        </Document>
    );
};

export default ReceiptPDF;
