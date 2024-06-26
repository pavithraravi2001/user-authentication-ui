import styled from "@emotion/styled";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const LoggedOutHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLanguageChange = (event: any) => {
    const lang = event.target.value as string;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleFeaturesClick = () => {
    const fetchedFeatures = ["Feature 1", "Feature 2", "Feature 3"];
    setFeatures(fetchedFeatures);
    console.log(fetchedFeatures);
  };

  const StyledAppBar = styled(AppBar)`
    background-color: #191970;
  `;

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography
          variant="h2"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("AuthNexus")}
        </Typography>
        <Button
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "auto",
          }}
          onClick={handleFeaturesClick}
        >
          {t("About Us")}
        </Button>
        <Button
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "40px",
          }}
          onClick={handleFeaturesClick}
        >
          {t("Features")}
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          style={{ marginLeft: "1100px", marginTop: "40px" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {features.map((feature, index) => (
            <MenuItem key={index}>{feature}</MenuItem>
          ))}
        </Menu>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "10px",
          }}
          defaultValue="en"
        >
          <MenuItem value="en">{t("English")}</MenuItem>
          <MenuItem value="fr">{t("French")}</MenuItem>
        </Select>
        <Button
          component={Link}
          to="/login"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "50px",
          }}
        >
          {t("Log In")}
        </Button>
        <Button
          component={Link}
          to="/sign-up"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "40px",
          }}
        >
          {t("Create an AuthNexus Account")}
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default LoggedOutHeader;
