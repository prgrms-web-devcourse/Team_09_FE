import styled from '@emotion/styled';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Link, PageContainer, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import Comment from '~/components/common/Comment';
import DetailSidebar from '~/components/common/DetailSidebar';
import CourseDetailList from '~/components/domain/CourseDetail/CourseDetailList';
import CourseOverview from '~/components/domain/CourseDetail/CourseOverview';
import CourseSlider from '~/components/domain/CourseSlider';
import CourseMap from '~/components/domain/Map/CourseMap';
import { useUser } from '~/hooks/useUser';
import { CourseApi } from '~/service';
import theme from '~/styles/theme';
import { ICourseDetail, ICourseForm } from '~/types/course';
import { IPlaceForm } from '~/types/place';
import { sliceDate } from '~/utils/converter';

export const getServerSideProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    return {
      notFound: true
    };
  }

  try {
    const course = await CourseApi.read(courseId);
    return {
      props: { course: course || null, courseId: courseId || null }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

interface Props {
  course: ICourseDetail;
  courseId: number;
}

const CourseDetail = ({ course, courseId }: Props) => {
  const { currentUser, isLoggedIn } = useUser();
  const [detailData, setDetailData] = useState<ICourseDetail | null>(course);
  const router = useRouter();

  const getDetailInfo = async () => {
    if (isLoggedIn) {
      const result = await CourseApi.authRead(courseId);
      console.log('로그인 데이터', result);

      if (result) {
        setDetailData(result);
      }
    }
  };

  const setPlaceForm = () => {
    if (detailData) {
      return detailData.places.map((detail) => {
        return {
          id: detail.placeId,
          kakaoMapId: detail.id,
          name: detail.name,
          description: detail.description,
          addressName: detail.address,
          roadAddressName: detail.roadAddress,
          latitude: detail.latitude,
          longitude: detail.longitude,
          category: detail.category,
          phoneNumber: detail.phoneNumber,
          isRecommended: detail.isRecommended,
          isThumbnail: detail.isThumbnail,
          imageUrl: detail.imageUrl
        } as unknown as IPlaceForm;
      });
    } else {
      return {} as IPlaceForm[];
    }
  };

  const setEditQuery = () => {
    const queryData = {} as ICourseForm;
    queryData.id = courseId;
    if (detailData) {
      queryData.title = detailData.title;
      queryData.region = detailData.region;
      queryData.period = detailData.period;
      queryData.themes = detailData.themes;
      queryData.spots = detailData.spots;
      queryData.places = setPlaceForm();
    }
    return JSON.stringify(queryData);
  };

  const onDeleteCourse = async () => {
    if (confirm('삭제하시겠습니까?')) {
      await CourseApi.delete(courseId);
    }

    router.push('/');
  };

  useEffect(() => {
    if (isLoggedIn) {
      getDetailInfo();
    }
  }, [courseId, isLoggedIn]);

  if (!detailData) {
    return null;
  }

  return (
    <React.Fragment>
      <main>
        <PageContainer type="detail" style={{ position: 'relative' }}>
          <CourseDetailHeader>
            <CourseTitle>
              <Title level={2} size="lg" fontWeight={700} block>
                {detailData.title}
              </Title>
              {currentUser.user.id === detailData.userId && (
                <HeaderButtons>
                  <Link
                    href={{
                      pathname: `/course/${courseId}/edit`,
                      query: { courseQuery: setEditQuery() }
                    }}
                    /* as={`/course/${courseId}/edit`} */
                  >
                    수정
                  </Link>
                  <Text.Button color="gray" onClick={onDeleteCourse}>
                    삭제
                  </Text.Button>
                </HeaderButtons>
              )}
            </CourseTitle>
            <CourseDate>
              <Text color="gray">업로드한 날: {sliceDate(detailData.createdAt)}</Text>
              <Text color="gray">마지막 수정한 날: {sliceDate(detailData.updatedAt)}</Text>
            </CourseDate>

            <Profile>
              <Link href={`/userinfo/${detailData.userId}`}>
                <Avatar size={55} src={detailData.profileImage} />
              </Link>
              <Text color="dark" fontWeight={500}>
                {detailData.nickname}
              </Text>
            </Profile>
          </CourseDetailHeader>

          <CourseDetails>
            <CourseOverview
              themes={detailData.themes}
              period={detailData.period}
              region={detailData.region}
              courseCount={detailData.places.length}
              spots={detailData.spots}
            />

            <TravelRoute>
              <DetailTitle size="md" fontWeight={700}>
                여행경로
              </DetailTitle>
              <CourseMap course={detailData.places} />
            </TravelRoute>
            <TravelCourse>
              <DetailTitle size="md" fontWeight={700}>
                다녀온 코스
              </DetailTitle>
              <CourseSlider places={detailData.places} />
            </TravelCourse>
            <CourseDetailList places={detailData.places} />
          </CourseDetails>
          {courseId && <Comment id={courseId} type="course" writerId={detailData.userId} />}
          <DetailSidebar
            likes={detailData.likes}
            id={detailData.id}
            defaultLiked={detailData.isLiked}
            defaultBookmarked={detailData.isBookmarked}
            type="course"
          />
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default CourseDetail;

const { fontGray } = theme.color;

const CourseDetailHeader = styled.div`
  position: relative;
  margin-top: 40px;
`;
const CourseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CourseDate = styled.div`
  span {
    margin-right: 14px;
  }
`;

const HeaderButtons = styled.div`
  color: ${fontGray};
  button {
    font-size: 16px;
    margin-left: 8px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  margin-bottom: 70px;
`;
const CourseDetails = styled.div`
  margin-bottom: 100px;
`;

const DetailTitle = styled(Title)`
  margin-top: 110px;
  margin-bottom: 28px;
`;

const TravelRoute = styled.div``;
const TravelCourse = styled.div``;
