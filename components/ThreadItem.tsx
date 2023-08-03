import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  FlatList,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Text, View} from "@/components/Themed";
import {useSelector} from "react-redux";
import {Thread} from "@/Types";
import {RootState} from "@/redux/store";
import {time} from "@/helper/Time";
import {Image} from "expo-image";

const ThreadItem = ({thread}:any) => {
  const threads: Thread[] = useSelector((state: RootState) => state.threads);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";
  return (
    <View
      style={{
        ...styles.threadContainer,
      }}
      key={thread.id}
    >
      <View style={styles.authorContainer}>
        <Image
          source={thread.author.photo}
          style={styles.authorPhoto}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <View
          style={{
            ...styles.separator,
            borderColor: currentTheme === "dark" ? "gray" : "black",
          }}
        />
        <View style={styles.repliesContainer}>
          {[1, 2, 3].map(index => (
            <Image
              key={index}
              source={thread.replies[index - 1]?.author.photo}
              style={{
                ...styles.replyPhoto,
                width: index * 9,
                height: index * 9,
              }}
              placeholder={blurhash}
              contentFit="cover"
              transition={500}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          ...styles.threadContentContainer,
          marginHorizontal: thread.image && thread.repliesCount > 0 ? 12 : 0,
        }}
      >
        <View style={styles.threadHeaderContainer}>
          <View style={styles.authorNameContainer}>
            <Text style={styles.authorNameText}>{thread.author.name}</Text>
            {thread.author.verified && (
              <FontAwesome name="check-circle" size={15} color="#60a5fa" />
            )}
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time(thread.createdAt)}</Text>
            <FontAwesome
              name="ellipsis-h"
              size={15}
              color="gray"
              style={styles.iconEllipsis}
            />
          </View>
        </View>
        <Text style={styles.threadContentText}>{thread.content}</Text>
        {thread.image && (
          <Image
            source={thread.image}
            style={styles.threadImage}
            placeholder={blurhash}
            contentFit="cover"
            transition={300}
          />
        )}

        <View style={styles.iconRowContainer}>
          <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
          <FontAwesome name="comment-o" size={iconSize} color={iconColor} />
          <FontAwesome name="retweet" size={iconSize} color={iconColor} />
          <FontAwesome name="send" size={iconSize} color={iconColor} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {thread.repliesCount} replies . {thread.likesCount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  threadContainer: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  authorContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
  },
  authorPhoto: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: "#f7f8fa",
    overflow: "hidden",
  },
  separator: {
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "black",
    flexGrow: 1,
  },
  repliesContainer: {
    width: 20,
    alignItems: "center",
    alignSelf: "center",
    gap: 3,
  },
  replyPhoto: {
    borderRadius: 15,
    backgroundColor: "#f7f8fa",
    overflow: "hidden",
  },
  threadContentContainer: {
    gap: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  threadHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  authorNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorNameText: {
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeText: {
    color: "gray",
  },
  iconEllipsis: {
    marginRight: 5,
  },
  threadContentText: {
    fontWeight: "bold",
  },
  threadImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 2,
    maxHeight: 200,
  },
  iconRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    color: "gray",
  },
});


export default React.memo(ThreadItem);