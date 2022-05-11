import { PostFragmentFragment } from "../generated/graphql";

export const sortedByCommentAmount = (data: PostFragmentFragment[]) => {
  data.sort(
    (firstData, secondData) =>
      firstData.commentAmount - secondData.commentAmount
  );
};

export const sortedByPoint = (data: PostFragmentFragment[]) => {
  data.sort((firstData, secondData) => firstData.points - secondData.points);
};
