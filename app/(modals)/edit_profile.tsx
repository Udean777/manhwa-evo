import { colors, fonts, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { scale, verticalScale } from "@/utils/style";
import { UserDataType } from "@/utils/types";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateUser } from "@/services/userService";
import { router } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import * as Icons from "phosphor-react-native";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import Typography from "@/components/Typography";
import CustomInput from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";

const Modal = () => {
  const { user, updateUserData } = useAuth();
  const [data, setData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData({
      name: user?.username || "",
      image: user?.image || null,
    });
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setData({ ...data, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let { name } = data;

    if (!name.trim()) {
      Alert.alert("Pengguna", "Tolong isi semua field");
    }

    setIsLoading(true);
    const res = await updateUser(user?.uid as string, data);
    setIsLoading(false);

    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<Icons.ArrowLeft size={scale(20)} />}
        />

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(data?.image)}
              contentFit="cover"
              transition={500}
            />

            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral900}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typography
              color={colors.neutral900}
              fontFamily={fonts.PoppinsSemiBold}
            >
              Username
            </Typography>
            <CustomInput
              placeholder="Username"
              placeholderTextColor={colors.neutral500}
              // style={{
              //   fontFamily: fonts.PoppinsMedium,
              // }}
              value={data.name}
              onChangeText={(value) => setData({ ...data, name: value })}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <CustomButton
          onPress={onSubmit}
          style={{ flex: 1 }}
          loading={isLoading}
        >
          <Typography
            fontFamily={fonts.PoppinsSemiBold}
            size={17}
            color={colors.neutral900}
          >
            Edit Profil
          </Typography>
        </CustomButton>
      </View>
    </ModalWrapper>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral300,
    marginBottom: spacingY._15,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
