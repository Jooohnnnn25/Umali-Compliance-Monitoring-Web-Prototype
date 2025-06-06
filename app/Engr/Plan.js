import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

// Import the image once here (adjust path to your asset)
const buildingPlansImage = require("../../assets/buildingplans.png");

const documents = [
  { type: "Structural Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
  { type: "Mechanical Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
  { type: "Electrical Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
  { type: "Electronics Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
  { type: "Sanitary/Plumbing Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
  { type: "Architectural Plans", dateSubmitted: "04/05/2025", dateApproved: "04/06/2025" },
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
        <Link href="/Engr/Dashboard" asChild>
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
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Date Approved</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        {documents.map((doc, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 3 }]}>{doc.type}</Text>
            <Text style={[styles.cell, { flex: 1.2 }]}>{doc.dateSubmitted}</Text>
            <Text style={[styles.cell, { flex: 1.2 }]}>{doc.dateApproved}</Text>
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
            <Image
              source={buildingPlansImage}
              style={styles.image}
              resizeMode="contain"
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
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
