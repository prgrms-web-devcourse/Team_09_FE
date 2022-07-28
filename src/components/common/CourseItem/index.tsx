import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { Button, Icon, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';

const CourseItem = () => {
  return (
    <ItemContainer>
      <Thumbnail>
        <BookmarkIcon />
        <Text size="xs">제주 5코스</Text>
        <Title level={3} size={18} ellipsis>
          [1박 2일] 제주도 여행 추천! 힐링하고 싶은 사람 모두 모여라!
        </Title>
      </Thumbnail>
      <CourseInfo>
        <Text block ellipsis>
          인천공항→ 도렐제주본점 → 서귀포 1번길 → 기타등등의 여행지
        </Text>
        <Text block>#혼자여행 #맛집 #카페</Text>
        <InfoFooter>
          <LikeCount count={12} />
          <Profile>
            <Avatar src="/assets/location/jeju.jpg" size={26} />
            <Text color="gray">jinist</Text>
          </Profile>
        </InfoFooter>
      </CourseInfo>
    </ItemContainer>
  );
};

export default CourseItem;

const { borderGray, fontDarkGray } = theme.color;

const ItemContainer = styled.li`
  width: 372px;
  border-radius: 8px;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 210px;
  background-image: url('/assets/location/jeju.jpg');
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;
  box-sizing: border-box;
  color: white;
  line-height: 1.5;
  position: relative;
  background-size: cover;
`;

const CourseInfo = styled.div`
  padding: 14px;
  border: 1px solid ${borderGray};
  font-size: 16px;
  line-height: 1.5;
  background-color: white;
  color: ${fontDarkGray};
`;

const InfoFooter = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

// const BookmarkIcon = styled(Icon)`
//   position: absolute;
//   top: 16px;
//   right: 16px;
// `;