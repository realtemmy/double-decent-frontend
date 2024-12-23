import React from "react";
import { formatDate } from "@/utils/helperFunctions";

const OrderTracking = ({ status, statusDates }) => {
  // Define all steps
  const steps = ["paid", "confirmed", "delivered", "cancelled"];

  // Filter steps based on status
  const displaySteps =
    status === "cancelled"
      ? steps
      : steps.filter((step) => step !== "cancelled");

  // Helper function to determine the step status
  const getStepStatus = (currentStep, index) => {
    if (steps.indexOf(currentStep) > index) return "complete";
    if (steps.indexOf(currentStep) === index) return "active";
    return "default";
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full my-8"
      role="progressbar"
      aria-valuenow={steps.indexOf(status) + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      <div className="flex w-full max-w-4xl items-center justify-between flex-wrap">
        {displaySteps.map((step, index) => {
          const stepStatus = getStepStatus(status, index);

          // Define colors for each step status
          const stepColors = {
            active: "bg-orange-500 text-white border-orange-500",
            complete: "bg-green-500 text-white border-green-500",
            default: "bg-gray-300 text-gray-500 border-gray-300",
            cancelled: "bg-red-500 text-white border-red-500",
          };

          // If cancelled, override all step colors to red
          const isCancelled = status === "cancelled";
          const stepColorClass = isCancelled
            ? stepColors["cancelled"]
            : stepColors[stepStatus];

          return (
            <React.Fragment key={step}>
              <div className="flex-1 flex flex-col items-center min-h-[120px]">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${stepColorClass}`}
                  aria-label={step}
                  aria-current={
                    stepStatus === "active" || step === "cancelled"
                      ? "step"
                      : undefined
                  }
                >
                  {index + 1}
                </div>
                <div
                  className={`mt-2 text-xs md:text-sm text-center capitalize ${
                    isCancelled ? "text-red-500 font-semibold" : ""
                  }`}
                >
                  {step}
                </div>
                {/* Display the date if available */}
                {statusDates[step] && (
                  <div className="mt-1 text-xs text-gray-500 text-center break-words">
                    {formatDate(statusDates[step])}
                  </div>
                )}
              </div>
              {/* Connector Line */}
              {index < displaySteps.length - 1 && (
                <div className="flex-1 flex items-center">
                  <div
                    className={`w-full ${
                      isCancelled
                        ? "bg-red-500"
                        : getStepStatus(status, index + 1) === "default"
                        ? "bg-gray-300"
                        : "bg-green-500"
                    }`}
                    style={{ height: "2px" }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Display a cancellation message if status is cancelled */}
      {status === "cancelled" && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          This order has been cancelled and is no longer being tracked.
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
