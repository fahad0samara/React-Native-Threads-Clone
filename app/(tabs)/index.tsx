import {Button, SafeAreaView, ScrollView, StyleSheet} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Text, View} from "@/components/Themed";
import {useSelector} from "react-redux";
import {Thread} from "@/Types";
import {RootState} from "@/redux/store";
import {time} from "@/helper/Time";

export default function TabOneScreen() {
  const threads: Thread[] = useSelector((state: RootState) => state.threads);

  return (
    <SafeAreaView>
      <ScrollView>
        {threads.map((thread: Thread) => (
          <View key={thread.id}>
            <Text>{thread.author.username}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                {thread.author.name}
              </Text>
              {thread.author.verified && (
                <FontAwesome name="check-circle" size={15} color="blue" />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "gray",
                }}
              >
                {time(thread.createdAt)}
              </Text>
              <FontAwesome
                name="circle"
                size={15}
                color="gray"
                style={{
                  marginRight: 5,
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
