import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Board = styled.View`
  margin-top: 30px;
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
`;

const X = styled.Text`
  font-size: 50px;
  color: red;
`;

const O = styled.Text`
  font-size: 50px;
  color: blue;
`;

export default function App() {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleCellPress = (row, col) => {
    if (board[row][col] !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setBoard(newBoard);
  };

  const checkForWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
      if (
        board[0][i] !== '' &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
    return null;
  };

  const winner = checkForWinner();
  console.log(board)
  console.log(winner)

  return (
    <Container >
      <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 30, marginBottom: 20}}>Jogo da Velha</Text>
      </View>
      <Text style={{marginBottom: 30}}>Jogador atual: {currentPlayer}</Text>
      <Board>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} onPress={() => handleCellPress(rowIndex, colIndex)}>
                {cell === 'X' && <X>X</X>}
                {cell === 'O' && <O>O</O>}
              </Cell>
            ))}
          </Row>
        ))}
      </Board>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {winner && <Text>O vencedor é: {winner}</Text>}
        {winner && 
          <TouchableOpacity onPress={() => setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ])} style={{borderWidth: 1, borderRadius: 30, padding: 10, marginTop: 35}}>
            <Text style={{fontSize: 20}}>Reiniciar</Text>
          </TouchableOpacity>
        }  
      </View>
    </Container>
  );
}