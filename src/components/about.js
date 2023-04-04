import * as React from "react";
import { useState, useEffect, useRef } from "react";
import chroma from "chroma-js";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faQuestion
} from "@fortawesome/pro-light-svg-icons";

const HelpIcon = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.blue_dark};
  cursor: pointer;
  line-height: 1;
  border: solid 1.5px
    ${(props) => chroma(props.theme.colors.blue_dark).alpha(0.3)};
  padding: 5px 10px ;
  border-radius: 4px;
  transition: opacity 0.2s ease, background 0.2s ease, border 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => chroma(props.theme.colors.blue_dark).alpha(0.5)};
    background-color: ${(props) => props.theme.colors.blue_light_translucent};
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
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  width: 95vw;
  height: 90vh;
  max-height: 750px;
  max-width: 600px;
  overflow: hidden;
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
  const { strings } = props;
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const showAboutModal = () => {
    setIsComponentVisible(true);
    process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      window.gtag("event", "showAboutModal", { show: true });
  };
  return (
    <>
      <HelpIcon
        onClick={() => showAboutModal()}
        data-tooltip-id="tooltip-hover"
        data-tooltip-content={strings.metadata.nav.about}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </HelpIcon>
      {isComponentVisible && (
        <Modal>
          <ModalContent ref={ref}>
            <ModalHeader>
              <h2>{strings.about.title}</h2>
              <CloseModalIcon>
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  onClick={() => setIsComponentVisible(false)}
                />
              </CloseModalIcon>
            </ModalHeader>
            <ModalBody>
              <p>
                {strings.formatString(
                  strings.about.aboutCopy,
                  <OutboundLink
                    href="https://www.paris-brest-paris.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Paris-Brest-Paris
                  </OutboundLink>,
                  <>
                    <br />
                    <br />
                  </>
                )}
              </p>
              <h3>{strings.about.factorsTitle}</h3>
              <ul>
                <li>{strings.about.factorsStart}</li>
                <li>{strings.about.factorsNight}</li>
                <li>{strings.about.factorsWeather}</li>
                <li>{strings.about.factorsPrepared}</li>
              </ul>
              <h3>{strings.about.questionsTitle}</h3>
              <p>
                {strings.formatString(
                  strings.about.questionsCopy,
                  <OutboundLink href="https://github.com/marktron/pbpcalc/issues">
                    Github
                  </OutboundLink>
                )}
              </p>
              <p>{strings.formatString(strings.about.signOff, <br />)}</p>
              <p>
                <OutboundLink
                  href="https://markallen.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  markallen.io
                </OutboundLink>{" "}
                •{" "}
                <OutboundLink
                  href="https://www.strava.com/athletes/marktron3k"
                  target="_blank"
                  rel="noreferrer"
                >
                  Strava
                </OutboundLink>{" "}
                •{" "}
                <OutboundLink
                  href="https://www.instagram.com/moustache/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </OutboundLink>{" "}
                •{" "}
                <OutboundLink
                  href="https://www.twitter.com/moustache/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </OutboundLink>
              </p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
