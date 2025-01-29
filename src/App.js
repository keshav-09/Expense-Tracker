import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Utilities',
    'Healthcare',
    'Other'
  ];

  const addExpense = () => {
    if (description && amount && category) {
      const newExpense = {
        id: Math.random(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      setTotalExpenses(totalExpenses + parseFloat(amount));
      
      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  const deleteExpense = (expense) => {
    const updatedExpenses = expenses.filter(item => item.id !== expense.id);
    setExpenses(updatedExpenses);
    setTotalExpenses(totalExpenses - expense.amount);
  };

  const editExpense = (expense) => {
    const newAmount = prompt('Enter new amount:', expense.amount);
    const newDescription = prompt('Enter new description:', expense.description);
    const newCategory = prompt('Enter new category:', expense.category);

    if (newAmount !== null && newDescription !== null && newCategory !== null) {
      const updatedExpenses = expenses.map(item => {
        if (item.id === expense.id) {
          setTotalExpenses(totalExpenses - item.amount + parseFloat(newAmount));
          return {
            ...item,
            amount: parseFloat(newAmount),
            description: newDescription,
            category: newCategory
          };
        }
        return item;
      });
      setExpenses(updatedExpenses);
    }
  };

  const getCategoryExpenses = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="text-center bg-primary text-white">
              <h1 className="mb-0">Expense Tracker</h1>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="text-success">
                  Total Expenses: ${totalExpenses.toFixed(2)}
                </h2>
              </div>

              <Form className="mb-4">
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button 
                      variant="success" 
                      onClick={addExpense}
                      className="w-100"
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>

              <Row className="mb-4">
                {categories.map(cat => (
                  <Col md={4} key={cat} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title>{cat}</Card.Title>
                        <Card.Text className="text-success">
                          ${getCategoryExpenses(cat).toFixed(2)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <ListGroup>
                {expenses.map(expense => (
                  <ListGroup.Item
                    key={expense.id}
                    className="mb-2"
                  >
                    <Row className="align-items-center">
                      <Col>
                        <h5 className="mb-1">{expense.description}</h5>
                        <small className="text-muted">
                          {expense.date} | {expense.category}
                        </small>
                      </Col>
                      <Col xs="auto" className="text-success">
                        ${expense.amount.toFixed(2)}
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => editExpense(expense)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteExpense(expense)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseTracker;