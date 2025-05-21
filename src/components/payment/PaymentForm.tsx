import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { paymentService, PaymentMethod } from '../../services/paymentService';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentType, setPaymentType] = useState<'card' | 'bank'>('card');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await paymentService.getPaymentMethods();
        setPaymentMethods(methods);
        const defaultMethod = methods.find((method) => method.isDefault);
        if (defaultMethod) {
          setSelectedMethod(defaultMethod.id);
        }
      } catch (err) {
        setError('결제 수단을 불러오는데 실패했습니다.');
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (selectedMethod) {
        // 기존 결제 수단 사용
        const paymentIntent = await paymentService.createPaymentIntent(amount);
        await paymentService.confirmPayment(paymentIntent.id, selectedMethod);
      } else {
        // 새로운 카드 추가
        // 실제 구현에서는 Stripe Elements 등을 사용하여 카드 정보를 안전하게 처리
        const paymentMethod = await paymentService.addPaymentMethod('new_card_id');
        const paymentIntent = await paymentService.createPaymentIntent(amount);
        await paymentService.confirmPayment(paymentIntent.id, paymentMethod.id);
      }
      onSuccess();
    } catch (err) {
      setError('결제 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        결제 정보
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">결제 수단 선택</FormLabel>
              <RadioGroup
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as 'card' | 'bank')}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="신용카드"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="계좌이체"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {paymentType === 'card' && (
            <>
              {paymentMethods.length > 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>저장된 카드</InputLabel>
                    <Select
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>새로운 카드 등록</em>
                      </MenuItem>
                      {paymentMethods.map((method) => (
                        <MenuItem key={method.id} value={method.id}>
                          {method.brand} •••• {method.last4} (만료: {method.expiryMonth}/{method.expiryYear})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {!selectedMethod && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="카드 번호"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="만료일"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      fullWidth
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      fullWidth
                      placeholder="123"
                    />
                  </Grid>
                </>
              )}
            </>
          )}

          {paymentType === 'bank' && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" paragraph>
                결제 확인 후 아래 계좌로 입금해 주세요:
              </Typography>
              <Typography variant="body1" paragraph>
                은행: 신한은행
                <br />
                계좌번호: 110-123-456789
                <br />
                예금주: (주)API마켓플레이스
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {amount.toLocaleString()}원 결제하기
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PaymentForm; 