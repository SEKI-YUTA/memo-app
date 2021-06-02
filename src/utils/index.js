import { format } from "date-fns";

export const dateToString = (date) => {
  if (!date) return "";
  return format(date, "yyyy/M/d HH:mm");
};

export const translateErrors = (code) => {
  const error = {
    title: "エラー",
    description: "時間を置いて再度試してください",
  };
  switch (code) {
    case "auth/invalid-email":
      error.description = "メールアドレスが不正です";
      break;
    case "auth/user-disabled":
      error.description = "アカウントが無効です";
      break;
    case "auth/wrong-password":
      error.description = "パスワードが間違っています";
      break;
    case "auth/user-not-found":
      error.description = "ユーザーが見つかりません";
      break;

    case "auth/email-already-in-use":
      error.description = "メールアドレスが既に使われています";
      break;
    case "auth/operation-not-allowed":
      error.description = "開発者にお問い合わせください";
      break;
    case "auth/weak-password":
      error.description = "パスワードが簡単すぎます";
      break;

    default:
  }
  return error;
};
