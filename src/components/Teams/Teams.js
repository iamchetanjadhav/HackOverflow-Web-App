import React, { useEffect, useReducer, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Box, Heading, HStack } from "@chakra-ui/react";
import { Stack, VStack } from "@chakra-ui/react";

import "./xyz.css";
import {
  GridItem,
  SimpleGrid,
  Grid,
  Image as ChakraImage,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
// import Nav from "../components/navbar";
import { NavBar } from "../NavBar";
// import Head from "../components/heading";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// Import Swiper styles
import "swiper/css";
import {
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
//import css
import "./AppTeam.css";
import "./Animation.css";

const TeamNavMember = (props) => {
  //hover state
  const [hover, setHover] = useState(false);
  return (
    <Box
      pos="inherit"
      onClick={() => props.onClick()}
      h={{
        base: props.isSelected ? "60px" : "40px",
        md: props.isSelected ? "120px" : "100px",
      }}
      w={{
        base: props.isSelected ? "60px" : "40px",
        md: props.isSelected ? "120px" : "100px",
      }}
      // border="4px green solid"
      // borderRadius="50%"
      overflow="hidden"
      //onHover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ChakraImage
        src={props.image}
        width={{ base: "100%", md: "100%" }}
        height={{ base: "100%", md: "100%" }}
        objectFit="cover"
        // border={'4px solid yellow'}
      />
      {hover && (
        <Box
          pos="absolute"
          top={{ base: 0, md: 0 }}
          left={{ base: 0, md: 0 }}
          w={{ base: "100%", md: "100%" }}
          h={{ base: "100%", md: "100%" }}
          bg="rgba(0,0,0,0.5)"
          display="flex"
          borderRadius={{ base: "100", md: 100 }}
          // border={'4px solid yellow'}
        >
          <Text
            color="white"
            m="auto"
            p={2}
            fontSize={{ base: "1.5vw", md: "1.2vw" }}
            textAlign="center"
          >
            {props.name}
          </Text>
        </Box>
      )}
    </Box>
  );
};

const TeamNav = (props) => {
  // if elements are more than 5, then show arrows

  // available pos must be in odd numbers

  var posArrayTeamLeads = props.posArrayTeamLeads;
  const selectedPosTeamLeads = props.selectedPosTeamLeads;
  const setSelectedPosTeamLeads = props.setSelectedPosTeamLeads;
  const setPosArray = props.setPosArray;
  // selectedPosTeamLeads will always be in the center and bigger than the other positions

  const handleClicked = (it) => {
    //find the index of the clicked item
    const index = posArrayTeamLeads.findIndex((item) => item.name === it.name);
    // if the selectedPosTeamLeads is clicked, do nothing
    if (index === selectedPosTeamLeads) return;
    // if the selectedPosTeamLeads is not clicked, set the selectedPosTeamLeads to the clicked index

    const temp = [...posArrayTeamLeads];
    //get element at index and put it in the center
    const selectedElement = temp.splice(index, 1);
    temp.splice(temp.length / 2, 0, selectedElement[0]);
    setSelectedPosTeamLeads(Math.floor(temp.length - 1) / 2);
    //set the new array
    setPosArray(temp);
  };

  const [parent] = useAutoAnimate(/* optional config */);

  return (
    <HStack
      spacing={{ base: "10px", md: "20px" }}
      p={0}
      ref={parent}
      minH="20px"
      // border={'4px red solid'}
      display="flex"
    >
      {posArrayTeamLeads.map((it) => (
        <TeamNavMember
          image={it.image1}
          name={it.name}
          onClick={() => handleClicked(it)}
          key={it.key}
          isSelected={posArrayTeamLeads.indexOf(it) === selectedPosTeamLeads}
        />
      ))}
    </HStack>
  );
};

const Img = (src) => {
  return <img src={src} alt="team" />;
};

const CurrentTeamNav = (props) => {
  const allPosArray = props.posArrayTeamLeads;
  const [currentGroup, setCurrentGroup] = useState(0); // 0 for first three, 1 for fourth
  const [posArrayTeamLeads, setPosArray] = useState(
    allPosArray.slice(0, 3) // Initially show first 3
  );

  useEffect(() => {
    const key = currentGroup === 0 
      ? posArrayTeamLeads[selectedPosTeamLeads]?.key
      : "4"; // When showing 4th mentor
    props.parentSetSelectedPos(parseInt(key) - 1);
  }, [posArrayTeamLeads, currentGroup]);

  const [selectedPosTeamLeads, setSelectedPosTeamLeads] = useState(1);

  return (
    <HStack>
      {currentGroup === 1 && (
        <Box
          w={{ base: "20px", md: "40px" }}
          h={{ base: "20px", md: "40px" }}
          bg="black"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          ml={-10}
          onClick={() => {
            setCurrentGroup(0);
            setPosArray(allPosArray.slice(0, 3));
            setSelectedPosTeamLeads(1);
          }}
        >
          <AiOutlineLeft color="white" />
        </Box>
      )}

      <TeamNav
        posArrayTeamLeads={posArrayTeamLeads}
        selectedPosTeamLeads={selectedPosTeamLeads}
        setSelectedPosTeamLeads={setSelectedPosTeamLeads}
        setPosArray={setPosArray}
      />

      {currentGroup === 0 && allPosArray.length > 3 && (
        <Box
          w={{ base: "20px", md: "40px" }}
          h={{ base: "20px", md: "40px" }}
          bg="black"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          ml={120}
          onClick={() => {
            setCurrentGroup(1);
            setPosArray([allPosArray[3]]); // Show only the 4th mentor
            setSelectedPosTeamLeads(0);
          }}
        >
          <AiOutlineRight color="white" />
        </Box>
      )}
    </HStack>
  );
};

function Teampage() {
  // MENTORS SECTION .......................////////////////////////////
  const Mentors = [
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/sahil%20gaikwad.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/sahil%20gaikwad.png",
      id: "Sahil",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://www.instagram.com/sahil_gaikwad.__/",
      instagramhandle: "@sahil_gaikwad.__",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/sahil-gaikwad-b3a980223/",
      linkedinhandle: "@sahil-gaikwad",
      name: "App Mentor",
      content:
        "Hey everyone! 👋 I'm Sahil Gaikwad, a QA Engineer at Nasdaq & tech enthusiast 🚀. Passionate about Android, iOS, full-stack dev & data science! Excited to mentor at Hackoverflow 3.0—let’s build something awesome! 💡🔥",
      key: "1",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/swastik_patil.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/swastik_patil.png",
      id: "Swastik",
      github: "https://github.com/Swastik-Patil",
      githubhandle: "@Swastik-Patil",
      instagram: "https://www.instagram.com/swastikkpatil/",
      instagramhandle: "@swastikkpatil",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/swastikpatil",
      linkedinhandle: "@swastikpatil",
      name: "Web Mentor",
      content:
        "Hey everyone! 👋 I'm Swastik Patil, a software developer & GDG PHCET Technical Head 💻. Excited to mentor at Hackoverflow 3.0 🚀—let’s learn, build, and innovate together! 🔥",
      key: "2",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/prathamesh%20pandey.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/prathamesh%20pandey.png",
      id: "Prathamesh",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://www.instagram.com/prathmesh.pandey.129/",
      instagramhandle: "@prathmesh.pandey.129",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/prathmeshpandey9/",
      linkedinhandle: "@prathmeshpandey9",
      name: "H.O Founder",
      content:
        "Hey everyone! 👋 I'm Prathmesh Pandey, SIH'22 Winner & Founder of Hackoverflow.tech 🚀. Excited to mentor at Hackoverflow 3.0! 🎉 Let’s innovate and connect! 💡",
      key: "3",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/yash%20mahajan.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/yash%20mahajan.png",
      id: "Yash",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://hackoverflow3.tech/",
      instagramhandle: "@coming_soon",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/yash-mahajan-90b0b5219/",
      linkedinhandle: "@yash-mahajan",
      name: "Cloud Mentor",
      content:
        "Hey everyone! 👋 I’m Yash Mahajan, Sr. Executive at Godrej Infotech Ltd. Passionate about tech & innovation, I love sharing insights and guiding aspiring minds. Super excited to mentor at Hackoverflow 3.0—let’s learn, build, and innovate together! 🚀🔥",
      key: "4",
    },
    // {
    //   image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/reveal/reveal1.png",
    //   image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/reveal/reveal1.png",
    //   id: "😊",
    //   github: "https://hackoverflow3.tech/",
    //   githubhandle: "@coming_soon",
    //   instagram: "https://hackoverflow3.tech/",
    //   instagramhandle: "@coming_soon",
    //   youtube: "https://hackoverflow3.tech/",
    //   youtubehandle: "@coming_soon",
    //   linkedin: "https://hackoverflow3.tech/",
    //   linkedinhandle: "@coming_soon",
    //   name: "Cloud Mentor",
    //   content:
    //     "🚀 Calling all aspiring coders! 📣 Prepare to be inspired and empowered as I gear up to reveal myself as your guide and mentor in the epic saga of HackOverflow 3.0! 🌟",
    //   key: "5",
    // },
  ];

  // JUDGES ARRAY.................................//////////////////////////////
  const TeamLeads = [
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/nikita%20gandhi.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/nikita%20gandhi.png",
      id: "Nikita Gandhi",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://hackoverflow3.tech/",
      instagramhandle: "@coming_soon",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/nikita-gandhi01/",
      linkedinhandle: "@nikita-gandhi01",
      name: "Judge 1",
      content:
        "Hey everyone! 👋 I’m Nikita Gandhi, Technical Program Manager at Google. Excited to judge Hackoverflow 3.0 and witness amazing innovation! 🚀💡",
      key: "1",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/manav%20gupta.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/manav%20gupta.png",
      id: "Manav Gupta",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://www.instagram.com/tensor._.boy/",
      instagramhandle: "@tensor._.boy",
      youtube: "https://www.youtube.com/@tensorboy",
      youtubehandle: "@tensorboy",
      linkedin: "https://www.linkedin.com/in/--manav-gupta--/",
      linkedinhandle: "@--manav-gupta--",
      name: "Judge 2",
      content:
        "Hey innovators! 🚀 I'm Manav Gupta, an AI engineer & 3x Kaggle Expert, passionate about ML & LLMs. Pumped to judge Hackoverflow 3.0 and witness some next-level tech! 🔥🤖",
      key: "2",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/nirav%20sanghavi.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/nirav%20sanghavi.png",
      id: "Nirav Sanghavi",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://hackoverflow3.tech/",
      instagramhandle: "@coming_soon",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/nirav-sanghavi/",
      linkedinhandle: "@nirav-sanghavi",
      name: "Judge 3",
      content:
        "Hey everyone! 👋 I’m Nirav Sanghavi, Engineering Director at Sophos & your Judge ⚖️! With 20+ years in Java, Agile & Cloud Security ☁️, I’m excited to see your innovations! 🚀",
      key: "3",
    },
  ];

  // GUESTS ARRAY STARTS HERE..................
  const CoreTeam = [
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/rohini%20bhosale.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/rohini%20bhosale.png",
      id: "Rohini Bhosale",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://hackoverflow3.tech/",
      instagramhandle: "@coming_soon",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://www.linkedin.com/in/rohini-bhosale-3b78785a/",
      linkedinhandle: "@rohini-bhosale",
      name: "Guest 1",
      content:
        "Hey everyone! 🎤 Excited to join as a guest at H.O 3.0! As an Assistant Professor at DJSCE & ex-HOD of Computer Engg at PHCET, I can't wait to share my insights with you all! See you there! 🚀",
      key: "1",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/shridhar%20mankar.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/shridhar%20mankar.png",
      id: "Shridhar Mankar",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://www.instagram.com/5minutesengineering/",
      instagramhandle: "@5minutesengineering",
      youtube: "https://www.youtube.com/@5minutesengineering",
      youtubehandle: "@5minutesengineering",
      linkedin: "https://www.linkedin.com/in/shridhar-mankar",
      linkedinhandle: "@shridhar-mankar",
      name: "Guest 2",
      content:
        "Hey everyone! 🚀 I, Shridhar Mankar, am super excited to be a guest at H.O 3.0! With 730K+ subscribers on 5 Minute Engineering, I love making tech simple & fun! Can’t wait to meet you all—let’s make this event amazing! 🎤🔥",
      key: "2",
    },
    {
      image: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/reveal/reveal1.png",
      image1: "https://hackoverflow3.blr1.cdn.digitaloceanspaces.com/teams/reveal/reveal1.png",
      id: "😊",
      github: "https://hackoverflow3.tech/",
      githubhandle: "@coming_soon",
      instagram: "https://hackoverflow3.tech/",
      instagramhandle: "@coming_soon",
      youtube: "https://hackoverflow3.tech/",
      youtubehandle: "@coming_soon",
      linkedin: "https://hackoverflow3.tech/",
      linkedinhandle: "@coming_soon",
      name: "Guest 3",
      content: "Crafting Digital Excellence, One Line of Code at a Time.",
      key: "3",
    },
  ];

  const loadImages = () => {
    //load images from image and image1 in the TeamLeads and Mentors array
    var cache = [];
    Mentors.forEach((member) => {
      var img = (new Image().src = member.image);
      cache.push(img);
    });
    TeamLeads.forEach((member) => {
      var img = (new Image().src = member.image);
      cache.push(img);
    });
    CoreTeam.forEach((member) => {
      var img = (new Image().src = member.image);
      cache.push(img);
    });
  };

  useEffect(() => {
    loadImages();
  }, []);

  const [posArrayTeamLeads, setPosArray] = useState(TeamLeads);
  const [selectedPosTeamLeads, setSelectedPosTeamLeads] = useState(
    Math.floor((posArrayTeamLeads.length - 1) / 2)
  );
  const [selectedPosTeamLeadsX, setSelectedPosTeamLeadsX] = useState(
    Math.floor((posArrayTeamLeads.length - 1) / 2)
  );
  const [mountState, setMountState] = useState(true);
  useEffect(() => {
    setMountState(false);
  }, [posArrayTeamLeads]);

  useEffect(() => {
    //50 ms timeout to allow the animation to finish
    setTimeout(() => {
      setMountState(true);
    }, 50);
  }, [mountState]);

  const [selectedTeam, setSelectedTeam] = useState("leads");

  const [parent] = useAutoAnimate(/* optional config */);
  return (
    <ChakraProvider>
      <>
        <Box
          minH="100%"
          alignItems={"center"}
          w="100%"
          justifyContent={"center"}
          display={"flex"}
          className=""
        >
          <Box m={0} w="100%">
            <NavBar />
            <VStack
              justify={"center"}
              align={"center"}
              direction={"column"}
              display={"flex"}
              flexGrow={1}
              py={{ base: "5", md: "10" }}
              pb={{ base: "5", md: "20" }}
            >
              <Flex justify={"center"} align={"center"}>
                {/* For desktop view */}
                <Box
                  display={{ base: "none", md: "block" }}
                  justifySelf={"center"}
                  alignContent={"center"}
                  bgPosition={"center"}
                  alignItems={"center"}
                  width={{ md: 950 }}
                  height={{ md: 400 }}
                  p={{ md: 10 }}
                  mt={{ md: "5" }}
                  borderRadius={15}
                  bg="linear-gradient(93.17deg, rgba(91, 143, 129, 0.7) 0%, rgba(255, 255, 255, 0.2) 97.37%)"
                  boxShadow="inset 0px -4px 10px rgba(91, 143, 129, 0.7)"
                >
                  <Grid
                    templateAreas={`
                      "nav main"
                      "nav footer"
                      "nav social"
                    `}
                    gridTemplateRows={{ md: "0.5fr 0.7fr 1fr" }}
                    gridTemplateColumns={{ md: "0.5fr 1fr" }}
                  >
                    <GridItem pl="2" area={"nav"}>
                      <ChakraImage
                        src={posArrayTeamLeads[selectedPosTeamLeads]?.image}
                        fallbackSrc={posArrayTeamLeads[selectedPosTeamLeads]?.image1}
                        position="relative"
                        className="cursor-pointer"
                        mb={3}
                        width={{ md: "80%" }}
                        size={"auto"}
                        mt={{ md: 12 }}
                      />
                    </GridItem>
                    
                    {/* Main and footer sections for desktop */}
                    <GridItem pl={{ md: "2" }} area={"main"}>
                      <Text
                        mt={2}
                        color={"white"}
                        ml={{ md: 4 }}
                        className="fade-in"
                        textAlign={"left"}
                        key={posArrayTeamLeads[selectedPosTeamLeads]?.key}
                        fontFamily={"Gilroy-SemiBold"}
                        fontSize={{ md: "4xl" }}
                        display="block"
                        mb={2}
                        noOfLines={{ md: 2 }}
                        maxWidth="100%"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        Hi, my name is <span>{posArrayTeamLeads[selectedPosTeamLeads]?.id}</span>
                      </Text>
                    </GridItem>
                    
                    <GridItem pl="2" area={"footer"} pb={0} mb={0} display="block">
                      <Text
                        mt={{ md: 2 }}
                        fontFamily={"Gilroy-Regular"}
                        fontSize={{ md: "md" }}
                        color={"white"}
                        ml={{ md: 4 }}
                        className="fade-in"
                        textAlign={"left"}
                        key={posArrayTeamLeads[selectedPosTeamLeads]?.key}
                        display={"block"}
                        p={0}
                        noOfLines={{ md: 6 }}
                        maxHeight={{ md: "auto" }}
                        overflow="hidden"
                      >
                        {posArrayTeamLeads[selectedPosTeamLeads]?.content}
                      </Text>
                    </GridItem>
                    
                    {/* Social links for desktop */}
                    <GridItem area={"social"}>
                      <SimpleGrid
                        columns={{ md: 2 }}
                        spacingX={{ md: "20px" }}
                        spacingY={{ md: "30px" }}
                        ml={{ md: 4 }}
                        mt={{ md: 2 }}
                      >
                        {/* Desktop social icons - GitHub */}
                        <Box height={{ md: "35px" }}>
                          <Box
                            _hover={{ color: "#171515" }}
                            color={"white"}
                            width={{ base: "100%", md: "100%" }}
                            height={{ base: "auto", md: "auto" }}
                            display="flex"
                            alignItems="center"
                          >
                            <HStack spacing={{ base: 1, md: 2 }} alignItems="center" width="100%">
                              <Box width={{ base: "auto", md: "auto" }} minWidth={{ base: "18px", md: "60px" }}>
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-flex"}
                                >
                                  <FaGithub className="gfg-div" />
                                </Link>
                              </Box>
                              <Box className="social-text-container" flex="1">
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-block"}
                                  width="100%"
                                >
                                  <Text
                                    className="text-overflow-ellipsis"
                                    fontFamily={"Gilroy-Medium"}
                                    fontSize={{ base: "2.8vw", md: "1.2vw" }}
                                    noOfLines={1}
                                  >
                                    {posArrayTeamLeads[selectedPosTeamLeads]?.githubhandle}
                                  </Text>
                                </Link>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>

                        {/* Apply the same improved pattern to other social links */}
                        {/* Instagram */}
                        <Box height={{ md: "35px" }}>
                          <Box
                            _hover={{ color: "#E4405F" }}
                            color={"white"}
                            width={{ base: "100%", md: "100%" }}
                            height={{ base: "auto", md: "auto" }}
                            display="flex"
                            alignItems="center"
                          >
                            <HStack spacing={{ base: 1, md: 2 }} alignItems="center" width="100%">
                              <Box width={{ base: "auto", md: "auto" }} minWidth={{ base: "18px", md: "60px" }}>
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-flex"}
                                >
                                  <FaInstagram className="gfg-div" />
                                </Link>
                              </Box>
                              <Box className="social-text-container" flex="1">
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-block"}
                                  width="100%"
                                >
                                  <Text
                                    className="text-overflow-ellipsis"
                                    fontFamily={"Gilroy-Medium"}
                                    fontSize={{ base: "2.8vw", md: "1.2vw" }}
                                    noOfLines={1}
                                  >
                                    {posArrayTeamLeads[selectedPosTeamLeads]?.instagramhandle}
                                  </Text>
                                </Link>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>

                        {/* YouTube */}
                        <Box height={{ md: "35px" }}>
                          <Box
                            _hover={{ color: "#FF0000" }}
                            color={"white"}
                            width={{ base: "100%", md: "100%" }}
                            height={{ base: "auto", md: "auto" }}
                            display="flex"
                            alignItems="center"
                          >
                            <HStack spacing={{ base: 1, md: 2 }} alignItems="center" width="100%">
                              <Box width={{ base: "auto", md: "auto" }} minWidth={{ base: "18px", md: "60px" }}>
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.youtube}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-flex"}
                                >
                                  <FaYoutube className="gfg-div" />
                                </Link>
                              </Box>
                              <Box className="social-text-container" flex="1">
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.youtube}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-block"}
                                  width="100%"
                                >
                                  <Text
                                    className="text-overflow-ellipsis"
                                    fontFamily={"Gilroy-Medium"}
                                    fontSize={{ base: "2.8vw", md: "1.2vw" }}
                                    noOfLines={1}
                                  >
                                    {posArrayTeamLeads[selectedPosTeamLeads]?.youtubehandle}
                                  </Text>
                                </Link>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>

                        {/* LinkedIn */}
                        <Box height={{ md: "35px" }}>
                          <Box
                            _hover={{ color: "#0A66C2" }}
                            color={"white"}
                            width={{ base: "100%", md: "100%" }}
                            height={{ base: "auto", md: "auto" }}
                            display="flex"
                            alignItems="center"
                          >
                            <HStack spacing={{ base: 1, md: 2 }} alignItems="center" width="100%">
                              <Box width={{ base: "auto", md: "auto" }} minWidth={{ base: "18px", md: "60px" }}>
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-flex"}
                                >
                                  <FaLinkedin className="gfg-div" />
                                </Link>
                              </Box>
                              <Box className="social-text-container" flex="1">
                                <Link
                                  href={posArrayTeamLeads[selectedPosTeamLeads]?.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  display={"inline-block"}
                                  width="100%"
                                >
                                  <Text
                                    className="text-overflow-ellipsis"
                                    fontFamily={"Gilroy-Medium"}
                                    fontSize={{ base: "2.8vw", md: "1.2vw" }}
                                    noOfLines={1}
                                  >
                                    {posArrayTeamLeads[selectedPosTeamLeads]?.linkedinhandle}
                                  </Text>
                                </Link>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>
                      </SimpleGrid>
                    </GridItem>
                  </Grid>
                </Box>
                
                {/* For mobile view - stacked layout */}
                <Box
                  display={{ base: "flex", md: "none" }}
                  flexDirection="column"
                  justifySelf={"center"}
                  alignItems={"center"}
                  width={{ base: "90%" }}
                  borderRadius={15}
                  bg="linear-gradient(93.17deg, rgba(91, 143, 129, 0.7) 0%, rgba(255, 255, 255, 0.2) 97.37%)"
                  boxShadow="inset 0px -4px 10px rgba(91, 143, 129, 0.7)"
                  p={{ base: 4 }}
                  mt={{ base: "-5" }}
                >
                  {/* Mobile image on top */}
                  <Box 
                    width="100%" 
                    display="flex" 
                    justifyContent="center" 
                    mb={4}
                  >
                    <ChakraImage
                      src={posArrayTeamLeads[selectedPosTeamLeads]?.image}
                      fallbackSrc={posArrayTeamLeads[selectedPosTeamLeads]?.image1}
                      position="relative"
                      className="cursor-pointer"
                      width={{ base: "70%" }}
                      maxWidth="200px"
                      size={"auto"}
                      borderRadius="10px"
                    />
                  </Box>
                  
                  {/* Mobile name section */}
                  <Box width="100%" mb={3}>
                    <Text
                      color={"white"}
                      className="fade-in"
                      textAlign={"center"}
                      key={`name-${posArrayTeamLeads[selectedPosTeamLeads]?.key}`}
                      fontFamily={"Gilroy-SemiBold"}
                      fontSize={{ base: "4.5vw" }}
                      mb={2}
                      noOfLines={1}
                    >
                      Hi, my name is <span>{posArrayTeamLeads[selectedPosTeamLeads]?.id}</span>
                    </Text>
                  </Box>
                  
                  {/* Mobile content section */}
                  <Box width="100%" mb={4}>
                    <Text
                      fontFamily={"Gilroy-Regular"}
                      fontSize={{ base: "2.8vw" }}
                      color={"white"}
                      className="fade-in"
                      textAlign={"center"}
                      key={`content-${posArrayTeamLeads[selectedPosTeamLeads]?.key}`}
                      display={"block"}
                      noOfLines={4}
                      maxHeight="12vh"
                      overflow="hidden"
                    >
                      {posArrayTeamLeads[selectedPosTeamLeads]?.content}
                    </Text>
                  </Box>
                  
                  {/* Mobile social links - 2x2 grid */}
                  <SimpleGrid
                    columns={2}
                    spacingX="15px"
                    spacingY="10px"
                    width="100%"
                  >
                    {/* GitHub */}
                    <Box height="25px">
                      <Box
                        _hover={{ color: "#171515" }}
                        color={"white"}
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={1} alignItems="center" width="100%">
                          <Box minWidth="18px">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.github}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-flex"}
                            >
                              <FaGithub className="gfg-div" />
                            </Link>
                          </Box>
                          <Box className="social-text-container" flex="1">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.github}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-block"}
                              width="100%"
                            >
                              <Text
                                className="text-overflow-ellipsis"
                                fontFamily={"Gilroy-Medium"}
                                fontSize="2.8vw"
                                noOfLines={1}
                              >
                                {posArrayTeamLeads[selectedPosTeamLeads]?.githubhandle}
                              </Text>
                            </Link>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                    
                    {/* Instagram */}
                    <Box height="25px">
                      <Box
                        _hover={{ color: "#E4405F" }}
                        color={"white"}
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={1} alignItems="center" width="100%">
                          <Box minWidth="18px">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.instagram}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-flex"}
                            >
                              <FaInstagram className="gfg-div" />
                            </Link>
                          </Box>
                          <Box className="social-text-container" flex="1">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.instagram}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-block"}
                              width="100%"
                            >
                              <Text
                                className="text-overflow-ellipsis"
                                fontFamily={"Gilroy-Medium"}
                                fontSize="2.8vw"
                                noOfLines={1}
                              >
                                {posArrayTeamLeads[selectedPosTeamLeads]?.instagramhandle}
                              </Text>
                            </Link>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                    
                    {/* YouTube */}
                    <Box height="25px">
                      <Box
                        _hover={{ color: "#FF0000" }}
                        color={"white"}
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={1} alignItems="center" width="100%">
                          <Box minWidth="18px">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.youtube}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-flex"}
                            >
                              <FaYoutube className="gfg-div" />
                            </Link>
                          </Box>
                          <Box className="social-text-container" flex="1">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.youtube}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-block"}
                              width="100%"
                            >
                              <Text
                                className="text-overflow-ellipsis"
                                fontFamily={"Gilroy-Medium"}
                                fontSize="2.8vw"
                                noOfLines={1}
                              >
                                {posArrayTeamLeads[selectedPosTeamLeads]?.youtubehandle}
                              </Text>
                            </Link>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                    
                    {/* LinkedIn */}
                    <Box height="25px">
                      <Box
                        _hover={{ color: "#0A66C2" }}
                        color={"white"}
                        width="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={1} alignItems="center" width="100%">
                          <Box minWidth="18px">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-flex"}
                            >
                              <FaLinkedin className="gfg-div" />
                            </Link>
                          </Box>
                          <Box className="social-text-container" flex="1">
                            <Link
                              href={posArrayTeamLeads[selectedPosTeamLeads]?.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              display={"inline-block"}
                              width="100%"
                            >
                              <Text
                                className="text-overflow-ellipsis"
                                fontFamily={"Gilroy-Medium"}
                                fontSize="2.8vw"
                                noOfLines={1}
                              >
                                {posArrayTeamLeads[selectedPosTeamLeads]?.linkedinhandle}
                              </Text>
                            </Link>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Flex>

              <Flex align={"center"} justify="center">
                <VStack>
                  <Box>
                    <Box textAlign={"center"} alignItems="center">
                      <HStack
                        mt={5}
                        // center align
                        spacing={5}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <VStack
                          onClick={async () => {
                            await setPosArray(Mentors);
                            setSelectedPosTeamLeads(
                              Math.floor((Mentors.length - 1) / 2)
                            );
                            setSelectedTeam("mentors");
                          }}
                          opacity={selectedTeam === "mentors" ? 1 : 0.5}
                          color="white"
                        >
                          <Text
                            fontSize={{ base: "4vw", md: 30 }}
                            fontFamily={"Gilroy-Bold"}
                            className="cursor-pointer"
                            // id="orange-pink"
                            _hover={{
                              bgGradient:
                                // "linear-gradient(99.23deg, #EA4335 2.35%, #4285F4 39.86%, #0F9D58 66.07%, #FBBC04 94.29%)",
                                "linear-gradient(98.84deg, #80ffea 43.27%, #8aff81 71.84%)",
                              bgClip: "text",
                            }}
                          >
                            Mentors
                          </Text>
                          <ChakraImage
                            src="/Line 3.webp"
                            ml={"auto"}
                            mr={"auto"}
                            align="center"
                            width={{ base: "50%", md: "80%" }}
                          />
                        </VStack>

                        <VStack
                          onClick={async () => {
                            await setPosArray(TeamLeads);
                            setSelectedPosTeamLeads(
                              Math.floor((TeamLeads.length - 1) / 2)
                            );
                            setSelectedTeam("leads");
                          }}
                          opacity={selectedTeam === "leads" ? "1" : "0.5"}
                          color="white"
                        >
                          <Text
                            fontSize={{ base: "4vw", md: 30 }}
                            fontFamily={"Gilroy-Bold"}
                            className="cursor-pointer"
                            // id="orange-pink"
                            _hover={{
                              bgGradient:
                                // "linear-gradient(99.23deg, #EA4335 2.35%, #4285F4 39.86%, #0F9D58 66.07%, #FBBC04 94.29%)",
                                "linear-gradient(98.84deg, #80ffea 43.27%, #8aff81 71.84%)",
                              bgClip: "text",
                            }}
                            //color = {selectedTeam === "core" ? "white" : "gray.600"}
                          >
                            Judges
                          </Text>
                          <ChakraImage
                            src="/Line 3.webp"
                            ml={"auto"}
                            mr={"auto"}
                            align="center"
                            width={{ base: "50%", md: "80%" }}
                          />
                        </VStack>
                        <VStack
                          onClick={() => {
                            setPosArray(CoreTeam);
                            setSelectedPosTeamLeads(
                              Math.floor((CoreTeam.length - 1) / 2)
                            );
                            setSelectedTeam("core");
                          }}
                          opacity={selectedTeam === "core" ? "1" : "0.5"}
                          color="white"
                        >
                          <Text
                            fontSize={{ base: "4vw", md: 30 }}
                            fontFamily={"Gilroy-Bold"}
                            className="cursor-pointer"
                            // id="orange-pink"
                            _hover={{
                              bgGradient:
                                // "linear-gradient(99.23deg, #EA4335 2.35%, #4285F4 39.86%, #0F9D58 66.07%, #FBBC04 94.29%)",
                                "linear-gradient(98.84deg, #80ffea 43.27%, #8aff81 71.84%)",
                              bgClip: "text",
                            }}
                            //color = {selectedTeam === "core" ? "white" : "gray.600"}
                          >
                            Guests
                          </Text>
                          <ChakraImage
                            src="/Line 3.webp"
                            ml={"auto"}
                            mr={"auto"}
                            align="center"
                            width={{ base: "50%", md: "80%" }}
                          />
                        </VStack>
                      </HStack>
                    </Box>
                  </Box>
                  <Flex maxW={"100vw"}>
                    <Box
                      mt={4}
                      alignContent="center"
                      position={"relative"}
                      className="cursor-pointer"
                      w="100%"
                      ml={50}
                    >
                      {mountState ? (
                        <CurrentTeamNav
                          posArrayTeamLeads={posArrayTeamLeads}
                          parentSetSelectedPos={setSelectedPosTeamLeads}
                          selectedPosTeamLeads={selectedPosTeamLeads}
                        />
                      ) : (
                        // This will force a re-render of the component
                        <Box>
                          <CurrentTeamNav
                            posArrayTeamLeads={Mentors}
                            parentSetSelectedPos={setSelectedPosTeamLeadsX}
                            selectedPosTeamLeads={selectedPosTeamLeadsX}
                          />
                        </Box>
                      )}
                    </Box>
                  </Flex>
                </VStack>
              </Flex>
            </VStack>
          </Box>
        </Box>
      </>
    </ChakraProvider>
  );
}

export default Teampage;