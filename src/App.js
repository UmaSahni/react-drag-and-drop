import { Container, Stack, Flex, List, Heading } from "@chakra-ui/react";
import { useState } from "react";
import Players from "./Components/Players";
import { useDrop } from "react-dnd";

let playerarr = [
  { name: "Player 1", id: 1 },
  { name: "Player 2", id: 2 },
  { name: "Player 3", id: 3 },
  { name: "Player 4", id: 4 },
  { name: "Player 5", id: 5 },
  { name: "Player 6", id: 6 }
];

function App() {
  const [players, setPlayers] = useState(playerarr);
  const [team, setTeam] = useState([]);

  const [{ isOver: isPlayerOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  });

  const [{ isOver: isTeamOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  });

const movePlayerToTeam = (item) => {
  console.log(item)
  setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== item.index));
  setTeam((prevTeam) => [...prevTeam, { ...item, index: prevTeam.length }]);
};

const removePlayerFromTeam = (item) => {
  setTeam((prevTeam) => prevTeam.filter((_, i) => i !== item.index));
  setPlayers((prevPlayers) => [...prevPlayers, { ...item, index: prevPlayers.length }]);
};

  return (
    <div>
      <Container maxW={"800px"}>
        <Heading p={4} textAlign={"center"} color={"GrayText"} >React Drag and Drop</Heading>
        <Flex justify={"space-between"} height={"90vh"} align={"center"}>
          <Stack width={"300px"}>
            <Heading fontSize={"3xl"} color={"yellow.800"} textAlign={"center"}>
              PLAYERS
            </Heading>
            <List
            
              p={"4"}
              minH={"70vh"}
              boxShadow={"xl"}
              borderRadius={"md"}
              ref={removeFromTeamRef}
              // backgroundColor = {"dodgerblue"}
              backgroundColor={isPlayerOver ? "yellow.100" : "yellow.300"}
            >
              {players.map((el, i) => (
                <Players
                
                  item={el}
                  type="player"
                  onDropPlayer={ movePlayerToTeam}
                  {...el}
                  key={el.id}
                  index={i}
                />
              ))}
            </List>
          </Stack>

          <Stack width={"300px"}>
            <Heading fontSize={"3xl"} color={"teal.800"} textAlign={"center"}>
              TEAMS
            </Heading>
            <List
            backgroundColor={isTeamOver ? "teal.200" : "teal.300"}
            ref={addToTeamRef} p={"4"} minH={"70vh"} boxShadow={"xl"} borderRadius={"md"}>
              {team.map((el, i) => (
                <Players
                  item={el}
                  type="team"
                  onDropPlayer={removePlayerFromTeam}
                  {...el}
                  key={el.id}
                  index={i}
                />
              ))}
            </List>
          </Stack>
        </Flex>
      </Container>
    </div>
  );
}

export default App;
