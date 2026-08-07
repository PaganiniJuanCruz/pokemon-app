import { Card, ImgPlaceholder, LinePlaceholder } from "./SkeletonCard.styles.js";

function SkeletonCard() {
  return (
    <Card>
      <ImgPlaceholder />
      <LinePlaceholder $w="50%" />
      <LinePlaceholder $w="80%" />
      <LinePlaceholder $w="60%" />
    </Card>
  );
}

export default SkeletonCard;
