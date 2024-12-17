import React from "react";

// Order status tracker component
const OrderTracking = ({ status }) => {
  // Define the order steps and their display names
  const steps = ["paid", "confirmed", "delivered", "cancelled"];

  // Function to determine step status (active, complete, or default)
  const getStepStatus = (currentStep, index) => {
    if (steps.indexOf(currentStep) > index) return "complete";
    if (steps.indexOf(currentStep) === index) return "active";
    return "default";
  };

  return (
    <div className="flex items-center justify-center w-full my-8">
      <div className="flex w-full max-w-4xl items-center justify-between">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(status, index);

          // Determine colors based on step status
          const stepColors = {
            active: "bg-blue-500 text-white border-blue-500",
            complete: "bg-green-500 text-white border-green-500",
            default: "bg-gray-300 text-gray-500 border-gray-300",
          };

          return (
            <React.Fragment key={step}>
              {/* Step Container */}
              <div className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${stepColors[stepStatus]}`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-sm text-center">{step}</div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center">
                  <div
                    className={`h-1 w-full -translate-y-full ${
                      getStepStatus(status, index + 1) === "default"
                        ? "bg-gray-300"
                        : "bg-green-500"
                    }`}
                    style={{ marginTop: "-1rem" }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
