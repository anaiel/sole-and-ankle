import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANTS = {
  default: {
    backgroundColor: undefined,
    content: undefined,
  },
  "on-sale": {
    backgroundColor: COLORS.primary,
    content: "Sale",
  },
  "new-release": {
    backgroundColor: COLORS.secondary,
    content: "Just Released!",
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';
  const Wrapper = variant === "default" ? DefaultWrapper : LabeledWrapper;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper
        style={{
          "--background-color": VARIANTS[variant].backgroundColor,
        }}
        content={VARIANTS[variant].content}
      >
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 340px;
`;

const DefaultWrapper = styled.article`
  padding-bottom: 20px;
  position: relative;
`;

const LabeledWrapper = styled(DefaultWrapper)`
  &:after {
    content: "${(p) => p.content}";
    position: absolute;
    top: 12px;
    right: -4px;
    padding: 8px 12px;
    color: ${COLORS.white};
    background-color: var(--background-color);
    border-radius: 2px;
    font-weight: ${WEIGHTS.medium};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${p => p.sale ? "text-decoration: line-through" : ""}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
