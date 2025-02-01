import { Button, Box, Card, Text, Alert, Link, Input, Checkbox } from "@nimbus-ds/components"
import { FormField } from "@nimbus-ds/patterns";
export function Login() {
  return (
    <div id="login">
      <Box
  alignItems="center"
  backgroundColor="neutral-surface"
  display="flex"
  height={{
    md: '100%',
    xs: 'calc(100vh - 61px)'
  }}
  justifyContent="center"
  p="4"
  width="100%"
>
  <Box
    flex="1"
    maxWidth="500px"
  >
    <Card>
      <Card.Header title="Título del login" />
      <Card.Body>
        <Box
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <Text>
            ¿No tenés una cuenta?
            <Link
              appearance="primary"
              textDecoration="none"
            >
              Creá acá una
            </Link>
          </Text>
          <Alert
            appearance="danger"
            title="Mensaje de error"
          >
            Texto del error
          </Alert>
          <Box
            display="flex"
            flexDirection="column"
            gap="2"
          >
            <FormField.Input label="Email" crossOrigin="" />
            <FormField label="Password">
              <Input.Password />
            </FormField>
            <Link appearance="primary">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          <Checkbox
            label="Mantenerme conectado"
            name="keep-login"
          />
        </Box>
      </Card.Body>
      <Card.Footer>
        <Button appearance="primary">
          Log in
        </Button>
      </Card.Footer>
    </Card>
  </Box>
</Box>
    </div>
  );
}