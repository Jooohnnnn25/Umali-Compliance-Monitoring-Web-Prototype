import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const data = {
  "Document Types": [
    { type: "Unified Application Form", date: "04/05/2025", status: "Submitted" },
    { type: "Ancillary Permit Forms", date: "04/05/2025", status: "Submitted" },
    { type: "Architectural Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Civil/Structural Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Electrical Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Sanitary Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Plumbing Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Mechanical Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Electronics Documents", date: "04/05/2025", status: "Submitted" },
    { type: "Geodetic Documents", date: "04/05/2025", status: "Submitted" },
  ],
  "More Document Types": [
    { type: "Lot Plan", date: "04/05/2025", status: "Submitted" },
    { type: "Photocopies of Valid Licenses", date: "04/05/2025", status: "Submitted" },
    { type: "Notarized estimated value", date: "04/05/2025", status: "Submitted" },
    { type: "Technical Specifications", date: "04/05/2025", status: "Submitted" },
    { type: "Structural Design and Seismic Analysis", date: "04/05/2025", status: "Submitted" },
    { type: "Plate Load Test Result", date: "04/05/2025", status: "Submitted" },
    { type: "Soil Boring Test Result", date: "04/05/2025", status: "Submitted" },
  ],
  "Proof of Ownership": [
    { type: "Original Certificate of Title (OCT)", date: "04/05/2025", status: "Submitted" },
    { type: "Transfer Certificate Title (TCT)", date: "04/05/2025", status: "Submitted" },
    { type: "Deed of Absolute Sale", date: "04/05/2025", status: "Submitted" },
    { type: "Tax Declaration", date: "04/05/2025", status: "Submitted" },
    { type: "Tax Receipt", date: "04/05/2025", status: "Submitted" },
  ],
  Clearances: [
    { type: "Construction Safety and Health Program", date: "04/05/2025", status: "Submitted" },
    { type: "Fire Safety Evaluation Clearance", date: "04/05/2025", status: "Submitted" },
    { type: "Locational Clearance", date: "04/05/2025", status: "Submitted" },
    { type: "DPWH Clearance", date: "04/05/2025", status: "Submitted" },
    { type: "Barangay Clearance", date: "04/05/2025", status: "Submitted" },
  ],
};

const Table = ({ title, rows, isClearance = false }) => (
  <View style={{ marginBottom: 40 }}>
    {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}

    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { flex: 2 }]}>
        {isClearance ? "Clearance Type" : "Document Type"}
      </Text>
      <Text style={[styles.headerCell, { flex: 1.2 }]}>Date Submitted</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
    </View>

    {rows.map((row, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={[styles.cell, { flex: 2 }]}>{row.type}</Text>
        <Text style={[styles.cell, { flex: 1.2 }]}>{row.date}</Text>
        <Text style={[styles.cell, { flex: 1, color: "#28a745", fontWeight: "600" }]}>
          {row.status}
        </Text>
      </View>
    ))}
  </View>
);

export default function ApplicationDocuments() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header with Return Icon */}
      <View style={styles.header}>
        <Link href="/admindashboard" asChild>
          <TouchableOpacity style={styles.returnIcon}>
            <Text style={styles.returnIconText}>←</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Application Documents</Text>
      </View>

      <ScrollView style={styles.container}>
        <Table title="Document Types" rows={data["Document Types"]} />
        <Table title="More Document Types" rows={data["More Document Types"]} />
        <Table title="Proof of Ownership" rows={data["Proof of Ownership"]} />
        <Table title="Clearances" rows={data["Clearances"]} isClearance />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  returnIcon: {
    paddingRight: 15,
    paddingVertical: 4,
  },
  returnIconText: {
    fontSize: 24,
    color: "#007AFF", // iOS blue
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 2,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerCell: {
    fontWeight: "700",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  cell: {
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
