import { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";

const CollapsePanel = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Card
        sx={{
          minWidth: "300px",
          border: "1px solid rgba(211,211,211,0.6)",
        }}
      >
        <CardHeader
          title="Complete Interview Preparation"
          action={
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="expand"
              size="small"
            >
              {open ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightIcon />
              )}
            </IconButton>
          }
        ></CardHeader>
        <div
          style={{
            backgroundColor: "rgba(211,211,211,0.4)",
          }}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            orientation="horizontal"
          >
            <CardContent>
              <Container>CONTENT</Container>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
};

export default CollapsePanel;
