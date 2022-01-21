import { useState } from "react";
import {
  styled,
  Switch,
  FormControlLabel,
  Typography,
  Button,
  Slider,
  Grid,
  Input,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import addonDict from "../data/addon_dictionary.json";

import useAspects from "../utils/hooks/useAspects";
import { setValue } from "mongoose/lib/utils";

const OptionsDiv = styled("div")({
  display: "flex",
  flexGrow: 0,
  flexDirection: "column",
  width: "100%",
});

const RowDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: "15px",
}));

const ColumnDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
  padding: "15px",
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRight: "none",
  borderLeft: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  width: "100%",
  "&:before": {
    display: "none",
  },
}));

const AccordionHeader = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(2)}, 0`,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  display: "flex",
  width: "100%",
  alignItems: "center",
}));

const Options = () => {
  return (
    <OptionsDiv>
      <Addons />
      <Filter />
      <Main />
    </OptionsDiv>
  );
};

const Close = () => {
  return (
    <RowDiv>
      <Button variant="outlined" fullWidth color="error">
        Close All Results
      </Button>
    </RowDiv>
  );
};

const Filter = () => {
  return (
    <Accordion>
      <AccordionHeader>
        <Typography>Filter</Typography>
      </AccordionHeader>
      <AccordionDetails
        sx={{
          justifyContent: "space-between",
          paddingBottom: "8px",
          button: {
            width: "155px",
          },
        }}
      >
        <Button variant="outlined">Select All</Button>
        <Button variant="outlined" color="error">
          Deselect All
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

const Addons = () => {
  const addons = Object.keys(addonDict);

  return (
    <Accordion>
      <AccordionHeader>
        <Typography>Addons</Typography>
      </AccordionHeader>
      <AccordionDetails>
        {addons.map((addon, i) => {
          return (
            <FormControlLabel
              key={i}
              control={<AddonSwitch addon={addon} />}
              label={addonDict[addon].name}
              labelPlacement="top"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

const Main = () => {
  const [steps, setSteps] = useState(1)

  const handleSliderChange = (event, newStep) => {
    setSteps(newStep)
  }
  
  const handleInputChange = (event) => {
    setSteps(event.target.value === '' ? '' : Number(event.target.value));
  }

  return (
    <ColumnDiv>
      <Button variant="outlined" color="success">
        Find Connection
      </Button>
      <Typography sx={{ marginTop: "15px", fontSize: "14px" }}>Steps</Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <Slider steps={10} marks min={1} max={10} valueLabelDisplay="auto" />
        </Grid>
        <Grid item>
          <Input
            value={steps}
            onChange={handleInputChange}
            size="small"
            inputProps={{
              step: 1,
              min: 1,
              max: 10,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </ColumnDiv>
  );
};

const AddonSwitch = ({ addon }) => {
  const { removeAddon, addAddon } = useAspects();
  const [checked, setChecked] = useState(true);

  const handleSwitch = () => {
    if (checked) {
      removeAddon(addon);
      setChecked(false);
    } else {
      addAddon(addon);
      setChecked(true);
    }
  };

  return (
    <Switch
      size="small"
      checked={checked}
      onChange={handleSwitch}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default Options;
