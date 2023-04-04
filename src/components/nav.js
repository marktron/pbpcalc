import * as React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/pro-duotone-svg-icons";
import About from "./about";

const NavContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 10px;
  justify-content: space-between;
  @media print {
    display: none;
  }
  @media ${(props) => props.theme.devices.tablet} {
    justify-content: flex-end;
    div {
      margin-left: 10px;
    }
  }
`;
const GlobeIcon = styled.span``;
const LanguagePicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  line-height: 1;
  color: ${(props) => props.theme.colors.blue_dark};
  border: solid 1.5px
    ${(props) => chroma(props.theme.colors.blue_dark).alpha(0.3)};
  padding: 5px;
  border-radius: 4px;
  transition: opacity 0.2s ease, background 0.2s ease, border 0.2s ease;
  cursor: pointer;
  ${GlobeIcon} {
    opacity: 0.75;
  }
  span {
    margin-left: 5px;
    
  }
  &:hover {
    border-color: ${(props) => chroma(props.theme.colors.blue_dark).alpha(0.5)};
    background-color: ${(props) => props.theme.colors.blue_light_translucent};
    ${GlobeIcon} {
      opacity: 1;
    }
  }
`;

export default function Nav(props) {
  const { strings, language, updateLanguage } = props;
  return (
    <NavContainer>
      <LanguagePicker
        onClick={() => updateLanguage(language === "en" ? "fr" : "en")}
        data-tooltip-id="tooltip-hover"
        data-tooltip-content={
          language === "en"
            ? strings.metadata.nav.english
            : strings.metadata.nav.french
        }
      >
        <GlobeIcon>
          <FontAwesomeIcon icon={faGlobe} />
        </GlobeIcon>
        <span role="img" aria-label={strings.metadata.nav.english}>
          {language === "en" ? "🇬🇧" : "🇫🇷"}
        </span>
      </LanguagePicker>
      <About
        strings={strings}
      />
    </NavContainer>
  );
}
