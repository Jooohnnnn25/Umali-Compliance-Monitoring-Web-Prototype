import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Pressable } from "react-native";
import { Link } from "expo-router";

// Import the image once here
const formImage = require("../../assets/Form.png");

const documents = [
  { type: "Application Form (Notarized, 1 Copy)", date: "04/05/2025" },
  { type: "Building Plans (1 Set)", date: "04/05/2025" },
  { type: "Lot Plan (1 Copy)", date: "04/05/2025" },
  { type: "TCT/Deed of Sale", date: "04/05/2025" },
  { type: "Bill of Materials", date: "04/05/2025" },
  { type: "Specifications", date: "04/05/2025" },
  { type: "Tax Declaration\nInspection Report Logbook", date: "04/05/2025" },
  { type: "Updated Tax Payment", date: "04/05/2025" },
];

export default function ApplicationDocuments() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleView = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with Return Icon */}
      <View style={styles.header}>
        <Link href="/CPDO/Dashboard" asChild>
          <TouchableOpacity style={styles.returnIcon}>
            <Text style={styles.returnIconText}>←</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Application Documents</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 3 }]}>Document Type</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Date Submitted</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        {documents.map((doc, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 3 }]}>{doc.type}</Text>
            <Text style={[styles.cell, { flex: 1.2 }]}>{doc.date}</Text>
            <TouchableOpacity
              style={[styles.cell, { flex: 1 }]}
              onPress={handleView}
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal for image popup */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Image source={formImage} style={styles.image} resizeMode="contain" />
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    color: "#007AFF",
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
  viewText: {
    color: "#007bff",
    fontWeight: "600",
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
