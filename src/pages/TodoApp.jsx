import { useState, useRef, useCallback } from "react";
import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Stack,
  Input,
  List,
  ListItem,
  HStack,
  Button,
  ButtonGroup,
  Checkbox,
  useColorModeValue,
  Heading,
  Tooltip,
  useToast,
  Link,
} from "@chakra-ui/react";

const TodoApp = () => {
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  const [todolist, setTodolist] = useState([]);
  const toast = useToast();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") insertTask();
  };

  const taskInput = useRef(null);
  const checkBox = useRef(null);

  const insertTask = useCallback(() => {
    if (taskInput.current.value === "") {
      toast({
        title: "Enter a task!",
        status: "warning",
        position: "top-right",
        isClosable: true,
      });
      return;
    }
    const newTask = {
      taskCount: todolist.length + 1,
      task: taskInput.current.value,
    };
    todolist.push(newTask);
    setTodolist([...todolist]);
    taskInput.current.value = "";
    toast({
      title: "Task Successfully Added!",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  }, [todolist]);

  const handleCheck = () => {
    const checkboxStatus = checkBox.current.checked;
    checkBox.current.parentNode.style.textDecoration = checkboxStatus
      ? "line-through"
      : "none";
  };

  return (
    <Stack spacing={3}>
      <Heading size="lg" fontSize="50px" textAlign={"center"}>
        To Do App
      </Heading>
      <HStack>
        <Input
          placeholder="Set a task for yourself!"
          ref={taskInput}
          onKeyDown={handleKeyDown}
        />
        <ButtonGroup>
          <Tooltip label="Add Task" aria-label="Add Task" placement="right">
            <Button colorScheme="blue" onClick={insertTask}>
              <AddIcon boxSize={3} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </HStack>
      <List className="list">
        {todolist.map((todo) => {
          return (
            <ListItem
              key={todo.taskCount}
              _hover={{ bg: hoverBgColor }}
              style={{ borderRadius: "5px" }}
            >
              <label
                htmlFor={`taskStatus-${todo.taskCount}`}
                className="list-item"
              >
                <Checkbox
                  id={`taskStatus-${todo.taskCount}`}
                  ref={checkBox}
                  onChange={handleCheck}
                >
                  <span>{todo.task}</span>
                </Checkbox>
              </label>
            </ListItem>
          );
        })}
      </List>
      <footer>
        Developed by {" "}
        <Link href="https://hemantsharma.dev" isExternal fontWeight={"bold"}>
          Hemant Sharma <ExternalLinkIcon mx="2px" />
        </Link>
      </footer>
    </Stack>
  );
};

export default TodoApp;
