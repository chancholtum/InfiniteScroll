import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const StyledContainer = styled.main`
  max-width: 80rem;
  margin: 10rem auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const StyledCardBox = styled.div`
  width: 20rem;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.12);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: space-between;
  background: #1f2937;
  border-radius: 20px;
`;

const SyledTopBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.h3`
  color: #e5e7eb;
`;

const StyledTagsBox = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledText = styled.p`
  font-size: 10px;
  color: #111827;
  background: #fef9c3;
  padding: 1px 5px;
  border-radius: 50px;
  text-align: center;

  ${(props) =>
    props.type === `levels` &&
    css`
      background: #fef9c3;
    `}
  ${(props) =>
    props.type === `topics` &&
    css`
      background: #e0f2fe;
    `}
  ${(props) =>
    props.type === `types` &&
    css`
      background: #a16207;
    `}
`;

const StyledBtnBox = styled.button`
  background: #0369a1;
  border: none;
  width: 100%;
  border-radius: 50px;
  padding: 5px 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #0e88c9;
  }
`;
const StyledLink = styled.a`
  font-size: 18px;
  border: none;
  color: #f3f4f6;
  text-decoration: none;
`;

const StyledHeadText = styled.h1`
  color: #fff;
  margin-top: 10rem;
  text-align: center;
`;

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      `https://api.sampleapis.com/codingresources/codingResources/?_page=${page}&limit=10`
    )
      .then((response) => response.json())
      .then((newData) => {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight / 2
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(data);

  return (
    <>
      <StyledHeadText>Coding Resources</StyledHeadText>
      <StyledContainer>
        {data.map((item, i) => (
          <StyledCardBox key={i}>
            <SyledTopBox>
              <StyledTitle>{item.description}</StyledTitle>
              <StyledTagsBox>
                {item.topics.map((topic) => (
                  <StyledText type="topics">{topic}</StyledText>
                ))}
              </StyledTagsBox>
              <StyledTagsBox>
                {item.levels.map((level) => (
                  <StyledText type="levels">{level}</StyledText>
                ))}
              </StyledTagsBox>
              <StyledTagsBox>
                {item.types.map((type) => (
                  <StyledText type="types">{type}</StyledText>
                ))}
              </StyledTagsBox>
            </SyledTopBox>

            <div>
              <StyledBtnBox>
                <StyledLink href={item.url}>See More</StyledLink>
              </StyledBtnBox>
            </div>
          </StyledCardBox>
        ))}
      </StyledContainer>
    </>
  );
};

export default App;
