import styled from '@emotion/styled';
import type { NextPage } from 'next';
import PlaceMap from '~/components/domain/Map/PlaceMap';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import theme from '~/styles/theme';
import Button from '~/components/atom/Button';
import { Link, Icon, Text } from '~/components/atom';
import CloseIcon from '~/components/domain/CourseCreate/SelectedArea/CloseIcon';
import PlusIcon from '~/components/domain/CourseCreate/SearchArea/PlusIcon';
import Modal from '~/components/atom/Modal';
import RegionSelect from '~/components/domain/CourseCreate/RegionSelect';
import { useRouter } from 'next/router';
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}
const CourseCreate: NextPage = () => {
  // todo: 추후 기능 구현에 필요
  /* const [region, setRegion] = useState();
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState<Marker>();*/
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState('');
  const [Value, setValue] = useState('');
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [visible, setVisible] = useState(true);
  const [region, setRegion] = useState('서울');
  const router = useRouter();

  useEffect(() => {
    if (!map) return;
    console.log(kakao.maps);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        const bounds = new kakao.maps.LatLngBounds();
        const tempMarkers: Marker[] = [];

        for (let i = 0; i < data.length; i++) {
          tempMarkers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x)
            },
            content: data[i].place_name
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(tempMarkers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정(장소 검색마다 하나씩 보여주므로 제거될 수 있음)
        map.setBounds(bounds);
      }
    });
  }, [map]);

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  const keywordChange = (e: { preventDefault: () => void; target: { value: string } }) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = (e: any) => {
    if (e.keyCode === 13) {
      if (Value === '') {
        //todo: SearchAddress 구현
        //alert('SearchAddress');
      }
    }
  };
  const handleNextStep = () => {
    router.push('/course/create/step2');
  };
  const dummyCourse = {
    region: region,
    places: [
      {
        id: 1266228191,
        lat: 35.0768018,
        lng: 129.023402,
        name: '송도해상케이블카 송도베이스테이션',
        address: '부산 서구 송도해변로 171',
        roadAddressName: '부산 서구 송도해변로 171',
        category: 'FD6',
        phoneNumber: '051-247-9900'
      },
      {
        id: 8202423,
        lat: 35.1538826,
        lng: 129.118628,
        name: '광안리해수욕장',
        address: '부산 수영구 광안해변로 219',
        roadAddressName: '부산 수영구 광안해변로 219',
        category: 'FD6',
        phoneNumber: '051-610-4744'
      },
      {
        id: 8111808,
        lat: 35.0554585,
        lng: 129.087973,
        name: '태종대유원지',
        address: '부산 영도구 동삼동 산 29-1',
        roadAddressName: '부산광역시 영도구 전망로 209',
        category: 'FD6',
        phoneNumber: '051-405-8745'
      }
    ]
  };
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: '100%', overflow: 'hidden' }}>
        <Modal visible={visible} onClose={() => setVisible(visible)}>
          <RegionSelect setRegion={setRegion} onClose={() => setVisible(false)} />
        </Modal>
        <CreateWrapper className="landing-page">
          <SelectedArea>
            <SelectedHeader>
              <Icon name="arrow" size={25} rotate={180} />
              <Text size={'xl'} style={{ marginLeft: '40%' }}>
                {visible === false ? region : '서울'}
              </Text>
            </SelectedHeader>
            <SelectedPlace>
              <div style={{ margin: '20px 0px 0px 20px' }}>
                <Text size="lg">인천공항</Text>
                <CloseIcon />
              </div>
              <Text size="sm" color="gray" style={{ marginLeft: '20px' }}>
                인천 중구 공항로 271 인천국제공항역
              </Text>
            </SelectedPlace>
            <Link
              href={{
                pathname: '/course/create/step2',
                query: { courseQuery: JSON.stringify(dummyCourse) }
              }}
              // query string 안보여주기 위해 필요한데 type error때문에 주석처리
              /* as={`/course/create/step2`} */
            >
              <Button buttonType="primary" size="lg" width="100%">
                코스 지정 완료
              </Button>
            </Link>
          </SelectedArea>
          {/* todo: 선택한 장소 정보를 받아와서 지도에서 해당 장소 랜더링 */}
          <MapArea>
            <PlaceMap
              placeId={10751028}
              placeName="인천국제공항"
              placeType=""
              center={{ lat: 37.4795073, lng: 126.440877 }}
              height="1000px"
            />
          </MapArea>
          <SearchArea>
            <div className="landing-page__inner">
              <div className="search-form-container">
                <form className="search-form" onSubmit={submitKeyword}>
                  <label htmlFor="place" className="form__label">
                    {/* todo: SearchedPlace 구현 */}
                  </label>
                </form>
              </div>
            </div>
            {/* todo: 제출한 검색어 넘기기 */}
            {/* <Map searchKeyword={Keyword}/> */}
            <div>
              <SearchInput
                type="text"
                id="movie-title"
                className="form__input"
                name="place"
                onChange={keywordChange}
                onKeyUp={valueChecker}
                placeholder="코스에 추가할 장소를 입력하세요"
                required
              />
            </div>
            <SearchedPlace>
              <div style={{ margin: '20px 0px 0px 20px' }}>
                <Text size="lg">인천공항</Text>
                <PlusIcon />
              </div>
              <Text size="sm" color="gray" style={{ marginLeft: '20px' }}>
                인천 중구 공항로 271 인천국제공항역
              </Text>
            </SearchedPlace>
            {/* todo: 조회된 장소가 없을 경우 주소 검색 API 호출 */}
            {/* <Button buttonType="primary" size="md" width={195} style={{ display: 'inline-block' }}>
              장소등록하기
            </Button>
            <SearchAddress /> */}
          </SearchArea>
        </CreateWrapper>
      </main>
    </React.Fragment>
  );
};

export default CourseCreate;

const { mainColor } = theme.color;

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SelectedArea = styled.div`
  width: 26%;
  margin: 20px 20px 20px 20px;
`;

const SelectedHeader = styled.div`
  margin: 30px 0 40px 0;
  text-align: center;
  display: flex;
`;

const SelectedPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 35px 0px 13px 0px;
  margin-bottom: 40px;
  gap: 20px;
  width: 100%;
  height: 45px;
  border: 1px solid #f3f4f4;
  border-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const MapArea = styled.div`
  width: 50%;
`;

const SearchArea = styled.div`
  width: 24%;
  margin: 20px 20px 20px 20px;
  text-align: center;
`;

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 50px;
  margin-bottom: 40px;
  padding: 24px;
  font-size: 14px;
  color: ${mainColor};
  border: 1px solid ${mainColor};
  border-radius: 8px;
  background-color: #f1f7ff;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%); // TODO :shadow 종류별로 파일 나누기

  &::placeholder {
    color: ${mainColor};
  }
`;

const SearchedPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  padding: 35px 0px 13px 0px;
  margin-bottom: 40px;
  gap: 20px;
  width: 100%;
  height: 45px;
  border: 1px solid #f3f4f4;
  border-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
