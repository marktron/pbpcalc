import * as React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareQuestion,
  faRectangleXmark,
} from "@fortawesome/pro-duotone-svg-icons";

const HelpIcon = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  right: 20px;
  top: 20px;
  font-size: 26px;
  color: ${(props) => props.theme.colors.blue_dark};
  opacity: 0.75;
  transition: opacity 0.2s ease;
  cursor: pointer;
  span {
    font-size: 16px;
    padding-right: 10px;
    line-height: 1;
    display: none;
  }
  &:hover {
    opacity: 1;
    span {
      display: block;
    }
  }
`;
const CloseModalIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 26px;
  color: ${(props) => props.theme.colors.blue_dark};
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;
const Modal = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  position: fixed;
  padding-top: 2%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  width: 95vw;
  height: 90vh;
  max-height: 750px;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  border-radius: 20px;
  box-shadow: 0 5px 10px ${(props) => props.theme.colors.gray_med};
  h2,
  h3 {
    color: ${(props) => props.theme.colors.blue_dark};
  }
  p,
  ul {
    margin-bottom: 20px;
  }
  a {
    color: ${(props) => props.theme.colors.gray_med};
    border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.colors.blue_dark};
      background: ${(props) => props.theme.colors.blue_light_translucent};
      border-bottom-color: ${(props) =>
        props.theme.colors.blue_light_translucent};
    }
  }
`;
const ModalHeader = styled.div`
  min-height: 60px;
  height: 60px;
  color: #ffffff;
  display: grid;
  padding-left: 20px;
  align-items: center;
  grid-template-columns: auto 60px;
  h2 {
    margin: 0;
    text-align: left;
    font-weight: 900;
  }
`;
const ModalBody = styled.div`
  flex: 1;
  text-align: left;
  overflow: auto;
  padding: 0 20px 20px 20px;
  h3 {
    margin-top: 10px;
    font-weight: 600;
  }
`;

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

export default function About(props) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <>
      <HelpIcon onClick={() => setIsComponentVisible(true)}>
        <span>What’s this all about?</span>
        <FontAwesomeIcon icon={faSquareQuestion} />
      </HelpIcon>
      {isComponentVisible && (
        <Modal>
          <ModalContent ref={ref}>
            <ModalHeader>
              <h2>About this site</h2>
              <CloseModalIcon>
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  onClick={() => setIsComponentVisible(false)}
                />
              </CloseModalIcon>
            </ModalHeader>
            <ModalBody>
              <p>
                This calculator is designed to help plan your 2023
                Paris-Brest-Paris timing strategy. How fast should you go? Where
                should you stop to sleep? How much time can you afford to
                spend eating pastries at control points? Play around with the
                options to test various scenarios.</p>
                <p>In addition to setting general averages for speed and time at controls, you can also customize those for each segment. At some point in the near future, you will be able to download or print your plan.</p>
              <h3>Important factors to consider</h3>
              <ul>
                <li>You will probably start faster than you intend.</li>
                <li>You will ride slower at night.</li>
                <li>
                  The weather will affect your speed and how long you spend at
                  controls.
                </li>
                <li>
                  A lot will happen during 1200km. While this calculator can help
                  plan your ride, be prepared to adapt in the moment as
                  circumstances change.
                </li>
              </ul>
              <h3>Questions & feedback</h3>
              <p>
                This is the part where I reveal haven’t ridden PBP yet, so there
                might be assumptions made here that are completely wrong! Please
                report any bugs on{" "}
                <a href="https://github.com/marktron/pbpcalc/issues">Github</a>. Feel free to send any other feedback on the platforms below.{" "}
              </p>
              <p>
                See you on the road!
                <br />
                Mark Allen (90 Hours / Wave K)
              </p>
              <p>
                <a href="https://markallen.io" target="_blank" noref>markallen.io</a> •{" "}
                <a href="https://www.strava.com/athletes/marktron3k" target="_blank" rel="noreferrer">Strava</a>{" "}
                • <a href="https://www.instagram.com/moustache/" target="_blank" rel="noreferrer">Instagram</a> •{" "}
                <a href="https://www.twitter.com/moustache/" target="_blank" rel="noreferrer">Twitter</a>
              </p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
