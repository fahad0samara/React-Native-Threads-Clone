import React from "react";
import {Platform, RefreshControl, SafeAreaView, FlatList} from "react-native";

import {useSelector} from "react-redux";
import {Thread} from "@/Types";
import {RootState} from "@/redux/store";

import ThreadItem from "@/components/ThreadItem";
import Lottie from "lottie-react-native";

export default function TabOneScreen() {
  const threads: Thread[] = useSelector((state: RootState) => state.threads);
  const animationRef = React.useRef<Lottie>(null);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={threads}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: thread}) => <ThreadItem thread={thread} />} // Use the ThreadItem component here
        contentContainerStyle={{
          paddingTop: Platform.select({android: 30}),
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => animationRef.current?.play()}
          />
        }
        ListHeaderComponent={
          <Lottie
            ref={animationRef}
            source={require("../../loder/animation.json")}
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
              marginBottom: 10,
            }}
            loop={false}
            onAnimationFinish={() => animationRef.current?.pause()}
          />
        }
      />
    </SafeAreaView>
  );
}
