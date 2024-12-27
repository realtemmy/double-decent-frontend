import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const AddressDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [addressField, setAddressField] = useState(
    initialData || {
      alias: "",
      street: "",
      state: "",
      lga: "",
      address: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressField((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Address" : "Add Address"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            name="alias"
            value={addressField.alias}
            placeholder="Alias (e.g., Home)"
            onChange={handleChange}
          />
          <Input
            name="street"
            value={addressField.street}
            placeholder="Street"
            onChange={handleChange}
          />
          <Select
            onValueChange={(value) =>
              setAddressField((prev) => ({ ...prev, state: value }))
            }
            value={addressField.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lagos">Lagos</SelectItem>
              {/* Add more states here */}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setAddressField((prev) => ({ ...prev, lga: value }))
            }
            value={addressField.lga}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ikorodu">Ikorodu</SelectItem>
              {/* Add more LGAs here */}
            </SelectContent>
          </Select>
          <Textarea
            name="address"
            value={addressField.address}
            placeholder="Full address"
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => onSubmit(addressField)} disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : "Save Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
AddressDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    alias: PropTypes.string,
    street: PropTypes.string,
    state: PropTypes.string,
    lga: PropTypes.string,
    address: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default AddressDialog;
