// Updated
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const rareNames = [
  "Laurence Francisco",
  "Aaron James Cortez",
  "Jomar Cerda",
];

const initialData = [
  {
    id: "1",
    dateReceived: "2025-06-01",
    applicationNumber: "BP-2025-001-C",
    professional: "Civil Engineer",
    user: rareNames[0],
    status: "Incomplete",
    remarks: "",
  },
  {
    id: "2",
    dateReceived: "2025-06-03",
    applicationNumber: "BP-2025-002-C",
    professional: "Architect",
    user: rareNames[1],
    status: "Complete",
    remarks: "",
  },
  {
    id: "3",
    dateReceived: "2025-06-05",
    applicationNumber: "BP-2025-003-C",
    professional: "Civil Engineer",
    user: rareNames[2],
    status: "Incomplete",
    remarks: "",
  },
];

export default function ComplianceScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRemarks, setCurrentRemarks] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notifiedUserName, setNotifiedUserName] = useState("");

  const router = useRouter();

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    if (newStatus === "Complete") {
      const selectedApp = applications.find((app) => app.id === id);
      if (selectedApp) {
        setNotifiedUserName(selectedApp.user);
        setNotificationModalVisible(true);
      }
    }
  };

  const openRemarksModal = (id, existingRemarks) => {
    setCurrentUserId(id);
    setCurrentRemarks(existingRemarks);
    setModalVisible(true);
  };

  const saveRemarks = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === currentUserId ? { ...app, remarks: currentRemarks } : app
      )
    );
    setModalVisible(false);
    setCurrentUserId(null);
    setCurrentRemarks("");
  };

  const filteredApps = applications.filter(
    (app) =>
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.professional.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.dateReceived}</Text>
      <Text style={[styles.cell, { flex: 1.3 }]}>{item.applicationNumber}</Text>
      <Text style={[styles.cell, { flex: 1.2 }]}>{item.professional}</Text>

      <TouchableOpacity
        style={[styles.cell, { flex: 1.2 }]}
        onPress={() => openRemarksModal(item.id, item.remarks)}
      >
        <Text style={{ color: "#007bff" }}>{item.user}</Text>
      </TouchableOpacity>

      <View style={[styles.cell, { flex: 1.2 }]}>
        <Picker
          selectedValue={item.status}
          style={{ height: 40 }}
          onValueChange={(val) => handleStatusChange(item.id, val)}
          mode="dropdown"
        >
          <Picker.Item label="Complete" value="Complete" />
          <Picker.Item label="Incomplete" value="Incomplete" />
        </Picker>
      </View>

      <View style={[styles.cell, { flex: 1.8, alignItems: "center" }]}>
        <TouchableOpacity
          style={styles.viewAppButton}
          onPress={() => router.push("/CPDO/Application")}
        >
          <Text style={styles.viewAppButtonText}>View Application</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.cell, { flex: 1.5 }]}>
        <Text style={{ color: "#666", fontStyle: "italic" }}>
          Click user name for remarks
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("/")}
          accessibilityLabel="Logout"
        >
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search applications..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.headerCell, { flex: 1 }]}>Date Received</Text>
        <Text style={[styles.headerCell, { flex: 1.3 }]}>Application #</Text>
        <Text style={[styles.headerCell, { flex: 1.2 }]}>Professionals</Text>
        <Text style={[styles.headerCell, { flex: 1.2 }]}>Users</Text>
        <Text style={[styles.headerCell, { flex: 1.2 }]}>Status</Text>
        <Text style={[styles.headerCell, { flex: 1.8 }]}></Text>
        <Text style={[styles.headerCell, { flex: 1.5 }]}>Remarks</Text>
      </View>

      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No applications found.
          </Text>
        )}
      />

      {/* Modal for adding remarks */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Remarks</Text>
            <TextInput
              style={styles.modalInput}
              multiline
              placeholder="Type remarks here..."
              value={currentRemarks}
              onChangeText={setCurrentRemarks}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, { backgroundColor: "#007bff" }]}
                onPress={saveRemarks}
              >
                <Text style={{ color: "white" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for notification */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationModalVisible}
        onRequestClose={() => setNotificationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { alignItems: "center" }]}>
            <MaterialIcons name="notifications-active" size={50} color="#007bff" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Notification Sent</Text>
            <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
              User {notifiedUserName} is notified that their requirements are complete. 
              Please check your email for confirmation.
            </Text>

            <Pressable
              style={[styles.modalButton, { backgroundColor: "#007bff", width: "50%" }]}
              onPress={() => setNotificationModalVisible(false)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    paddingVertical: 6,
  },
  headerRow: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 2,
  },
  cell: {
    paddingHorizontal: 4,
    fontSize: 14,
  },
  headerCell: {
    fontWeight: "bold",
    paddingHorizontal: 4,
    fontSize: 14,
  },
  viewAppButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  viewAppButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "85%",
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
  },
});
