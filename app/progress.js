import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Expo vector icons

const buildingPermitData = [
  {
    id: "1",
    applicantName: "Laurence Francisco",
    dateApplied: "2025-06-01",
    buildingPermit: "Completed",
    buildingPlans: "Incomplete",
    clearances: "Completed",
    daysAppliedAgo: 3,
  },
  {
    id: "2",
    applicantName: "Aaron James Cortez",
    dateApplied: "2025-06-02",
    buildingPermit: "Incomplete",
    buildingPlans: "Incomplete",
    clearances: "Incomplete",
    daysAppliedAgo: 1,
  },
  {
    id: "3",
    applicantName: "Jomar Cerda",
    dateApplied: "2025-05-30",
    buildingPermit: "Completed",
    buildingPlans: "Completed",
    clearances: "Completed",
    daysAppliedAgo: 5,
  },
];

const getTextStatusStyle = (status) => ({
  color: status.toLowerCase() === "completed" ? "#28a745" : "#dc3545",
  fontWeight: "600",
});

const getDaysRemainingText = (daysAgo) => {
  const limit = 5;
  const remaining = limit - daysAgo;
  if (remaining <= 0) return "Deadline passed";
  return remaining === 1 ? "1 day remaining" : `${remaining} days remaining`;
};

const getRemarks = (item) => {
  const pending = [];
  if (item.buildingPermit.toLowerCase() !== "completed")
    pending.push("Building Permit");
  if (item.buildingPlans.toLowerCase() !== "completed")
    pending.push("Building Plans");
  if (item.clearances.toLowerCase() !== "completed") pending.push("Clearances");
  if (pending.length === 0) return "None";
  return pending.join(", ");
};
export default function ComplianceTables() {
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const handleNotifyPress = (item) => {
    const incompleteItems = [];
    if (item.buildingPermit.toLowerCase() !== "completed")
      incompleteItems.push("Building Permit");
    if (item.buildingPlans.toLowerCase() !== "completed")
      incompleteItems.push("Building Plans");
    if (item.clearances.toLowerCase() !== "completed")
      incompleteItems.push("Clearances");

    let message = "";
    if (incompleteItems.length === 0) {
      message = `${item.applicantName} has no incomplete requirements.`;
    } else {
      message = `${item.applicantName} is notified about incomplete requirements on: ${incompleteItems.join(
        ", "
      )}.`;
    }

    setPopupMessage(message);
    setPopupVisible(true);

    // Hide popup after 3 seconds
    setTimeout(() => setPopupVisible(false), 3000);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Return icon button with Link */}
      <View style={styles.returnIconContainer}>
        <Link href="/admindashboard" asChild>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back-ios" size={28} color="#007bff" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={styles.container}>
        {/* Building Permit Section */}
        <Text style={styles.sectionTitle}>Building Permit Monitoring</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.8 }]}>Applicant Name</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Date Applied</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Building Permit</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Building Plans</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Clearances</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Next Action</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
          <Text style={[styles.headerCell, { flex: 1.3 }]}>Days Remaining</Text>
        </View>

        {buildingPermitData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 1.8 }]}>{item.applicantName}</Text>
            <Text style={[styles.cell, { flex: 1.2 }]}>{item.dateApplied}</Text>

            <Text
              style={[styles.cell, { flex: 1 }, getTextStatusStyle(item.buildingPermit)]}
            >
              {item.buildingPermit}
            </Text>

            <Text
              style={[styles.cell, { flex: 1 }, getTextStatusStyle(item.buildingPlans)]}
            >
              {item.buildingPlans}
            </Text>

            <Text
              style={[styles.cell, { flex: 1 }, getTextStatusStyle(item.clearances)]}
            >
              {item.clearances}
            </Text>

            <TouchableOpacity
              style={[styles.cell, { flex: 1 }]}
              onPress={() => handleNotifyPress(item)}
            >
              <Text style={{ color: "#007bff", fontWeight: "600" }}>Notify</Text>
            </TouchableOpacity>

            <Text
              style={[styles.cell, { flex: 2, color: "#dc3545", fontWeight: "600" }]}
            >
              {getRemarks(item)}
            </Text>

            <Text style={[styles.cell, { flex: 1.3 }]}>
              {getDaysRemainingText(item.daysAppliedAgo)}
            </Text>
          </View>
        ))}

        {/* Occupancy Section */}
        <Text style={[styles.sectionTitle, { marginTop: 40 }]}> Occupancy Monitoring</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Applicant Name</Text>
          <Text style={[styles.headerCell, { flex: 1.3 }]}>Date Applied</Text>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>Occupancy</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Next Action</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
          <Text style={[styles.headerCell, { flex: 1.3 }]}>Days Remaining</Text>
        </View>

        {buildingPermitData.map((item) => (
          <View key={"occ-" + item.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.applicantName}</Text>
            <Text style={[styles.cell, { flex: 1.3 }]}>{item.dateApplied}</Text>
            <Text
              style={[styles.cell, { flex: 1.5, color: "#ffc107", fontWeight: "600" }]}
            >
              In Progress
            </Text>
            <TouchableOpacity
              style={[styles.cell, { flex: 1 }]}
              onPress={() =>
                setPopupMessage(`${item.applicantName} is notified about occupancy requirements.`) || setPopupVisible(true) ||
                setTimeout(() => setPopupVisible(false), 3000)
              }
            >
              <Text style={{ color: "#007bff", fontWeight: "600" }}>Notify</Text>
            </TouchableOpacity>
            <Text
              style={[styles.cell, { flex: 2, fontStyle: "italic", color: "#dc3545" }]}
            >
              Pending Requirements
            </Text>
            <Text style={[styles.cell, { flex: 1.3 }]}>
              {getDaysRemainingText(item.daysAppliedAgo)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Popup container */}
      {popupVisible && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>{popupMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
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
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cell: {
    fontSize: 14,
    paddingHorizontal: 4,
  },

  popupContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    opacity: 0.9,
    zIndex: 1000,
  },
  popupText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  returnIconContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
});
